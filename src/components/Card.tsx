import styled from 'styled-components';

type CardVariant = 'filled' | 'flat';

type CardProps = {
  title?: string;
  variant?: CardVariant;
  children?: React.ReactNode;
} & React.ComponentPropsWithoutRef<'div'>;

const StyledCard = styled.div<{ $variant?: CardVariant }>`
  background: ${({ $variant = 'filled' }) => ($variant === 'filled' ? '#F8F8F8' : 'none')};
  border-radius: 8px;
  width: 360px;
  height: auto;
  margin: 16px 0;
  font-family: Arial, sans-serif;
  overflow: hidden; /* Para asegurar que el contenido no se desborde */
`;

const Header = styled.div`
  height: 38px;
  border-radius: 8px 8px 0 0;
  padding: 0 16px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  font-weight: 700;
  line-height: 16.59px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  background: linear-gradient(90.02deg, #0049a5 16.3%, #0067e9 54.17%, #4d9bff 96.03%);
`;

const HeaderText = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

const Content = styled.div`
  padding: 16px;
`;

const Card = ({ title, variant = 'filled', children, ...rest }: CardProps) => (
  <StyledCard $variant={variant} {...rest}>
    {title && (
      <Header title={title}>
        <HeaderText>{title}</HeaderText>
      </Header>
    )}
    <Content>{children}</Content>
  </StyledCard>
);

export default Card;
