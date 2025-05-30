const API_BASE_URL = 'https://integrityback.forzasoft.com.ar';
const REFRESH_ENDPOINT = '/auth/refresh';

export interface ApiResponse<T> {
  success: boolean;
  mensaje?: string;
  data?: T;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
}

const getToken = (): string | null => {
  try {
    return localStorage.getItem('accessToken');
  } catch {
    return null;
  }
};

const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem('refreshToken');
  } catch {
    return null;
  }
};

const saveTokens = (accessToken: string, refreshToken: string): void => {
  try {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  } catch {
    console.warn('Failed to save tokens');
  }
};

const clearTokens = (): void => {
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch {
    console.warn('Failed to clear tokens');
  }
};

// Flag to prevent multiple refresh requests
let isRefreshing = false;
let refreshQueue: {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}[] = [];

const refreshToken = async (): Promise<string> => {
  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const response = await fetch(`${API_BASE_URL}${REFRESH_ENDPOINT}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken: getRefreshToken() }),
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data: RefreshResponse = await response.json();
    saveTokens(data.accessToken, data.refreshToken);

    refreshQueue.forEach((promise) => promise.resolve(data.accessToken));
    refreshQueue = [];

    return data.accessToken;
  } catch (error) {
    console.error('Token refresh failed:', error);
    clearTokens();

    // Reject all queued requests
    const safeError = error instanceof Error ? error : new Error('Unknown error during token refresh');
    refreshQueue.forEach((promise) => promise.reject(safeError));
    refreshQueue = [];

    throw error;
  } finally {
    isRefreshing = false;
  }
};

export const apiFetch = async <T,>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> => {
  let token = getToken();

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    let response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
      console.warn('Unauthorized - Attempting token refresh...');

      try {
        token = await refreshToken();

        // Ensure existing headers are retained
        config.headers = new Headers(config.headers);
        config.headers.set('Authorization', `Bearer ${token}`);

        response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      } catch (refreshError) {
        console.error('Token refresh failed, logging out...');
        clearTokens();
        throw refreshError instanceof Error ? refreshError : new Error('Session expired. Please log in again.');
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Something went wrong');
    }

    const responseJson = await response.json();
    return responseJson as ApiResponse<T>;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};
