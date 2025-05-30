import styled, { css } from 'styled-components';

const TextGroupRoot = styled.div`
  font-size: 14px;
  line-height: 16.59px;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const TextGroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 6px 0px;

  &:last-child {
    border-bottom: none;
  }
`;

const TextGroupKey = styled.span<{ $loading: boolean }>`
  flex: 1;

  ${({ $loading }) => {
    if ($loading) {
      return css`
        background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: shimmer 3.5s infinite linear;
        border-radius: 4px;
        color: transparent;
        margin-right: 5px;

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `;
    } else {
      return css`
        color: #4c5260;
      `;
    }
  }}
`;

const TextGroupValue = styled.span<{ $loading: boolean; $color?: string }>`
  flex: 2;
  text-align: left;
  font-weight: 700;

  ${({ $loading, $color }) => {
    if ($loading) {
      return css`
        background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
        background-size: 200% 100%;
        animation: shimmer 3.5s infinite linear;
        border-radius: 4px;
        color: transparent;
        margin-left: 15px;
        margin-right: 20px;

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `;
    } else {
      return css`
        color: ${$color ?? '#4c5260'};
      `;
    }
  }}}
`;

interface KeyValueItem {
  key: string;
  value: string;
  color?: string;
}

const TextGroup = ({ list }: { list: KeyValueItem[] }) => {
  const empty = list[0].value === '';

  return (
    <TextGroupRoot>
      {list.map((item, index) => (
        <TextGroupItem key={index}>
          <TextGroupKey $loading={empty}>{item.key}:</TextGroupKey>
          <TextGroupValue $loading={empty} $color={item.color}>
            {item.value}
          </TextGroupValue>
        </TextGroupItem>
      ))}
    </TextGroupRoot>
  );
};

export default TextGroup;
