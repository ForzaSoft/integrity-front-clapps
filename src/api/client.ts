import createClient from 'openapi-fetch';
import type { paths } from './types';

export default createClient<paths>({ baseUrl: 'https://integrityback.forzasoft.com.ar' });
