import styled from 'styled-components';

const TextSkeleton = styled.div<{ width: number; height: number }>`
  border-radius: 4px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 3.5s infinite linear;

  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
`;

export default TextSkeleton;
