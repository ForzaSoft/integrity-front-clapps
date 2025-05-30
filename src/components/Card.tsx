import styled from 'styled-components';

type CardVariant = 'filled' | 'flat';

type CardProps = {
  width?: string;
  title?: string;
  paddingX?: number;
  paddingY?: number;
  marginTop?: number;
  variant?: CardVariant;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const StyledCard = styled.div<{ $width?: string; $variant?: CardVariant; $marginTop?: number }>`
  background: ${({ $variant = 'filled' }) => ($variant === 'filled' ? '#F8F8F8' : 'none')};
  border-radius: 8px;
  width: ${({ $width = '360px' }) => $width};
  margin-top: ${({ $marginTop = 0 }) => $marginTop}px;
  font-family: Arial, sans-serif;
`;

const Header = styled.div`
  height: 38px;
  border-radius: 8px 8px 0 0;
  padding-left: 15px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 14px;
  font-weight: 700;
  line-height: 16.59px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  background: linear-gradient(90.02deg, #0049a5 16.3%, #0067e9 54.17%, #4d9bff 96.03%);
`;

const Content = styled.div<{ $paddingX?: number; $paddingY?: number }>`
  padding: ${({ $paddingX = 10, $paddingY = 10 }) => `${$paddingY}px ${$paddingX}px`};
`;

const Card = ({ width, title, paddingX, paddingY, marginTop, variant, children, ...rest }: CardProps) => (
  <StyledCard $width={width} $variant={variant} $marginTop={marginTop} {...rest}>
    {title && <Header>{title}</Header>}
    <Content $paddingX={paddingX} $paddingY={paddingY}>
      {children}
    </Content>
  </StyledCard>
);

export default Card;
