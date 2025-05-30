import React from 'react';
import styled, { css } from 'styled-components';

export interface DropdownOption<T> {
  value: T;
  label: string;
}

type DropdownProps<T> = {
  options?: DropdownOption<T>[];
  selected?: T;
  onSelected?: (value: T) => void;
} & React.ComponentPropsWithoutRef<'div'>;

const Dropdown = styled.div`
  width: 100px;
  height: 22px;

  position: relative;

  font-size: 10px;
  line-height: 12px;
  color: #4c5260;
`;

const DropdownBox = styled.div<{
  $open: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding-left: 8px;
  padding-right: 8px;
  background: #ffffff;
  border-width: 1px;
  height: 100%;
  border: 1px solid #e2dedc;

  ${(props) => {
    if (props.$open) {
      return css`
        -webkit-border-radius: 11px 11px 0px 0px;
        border-radius: 11px 11px 0px 0px;
        border-bottom: none;
      `;
    } else {
      return css`
        -webkit-border-radius: 11px;
        border-radius: 11px;
      `;
    }
  }}
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 98px;
  background: white;
  border-top: none;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
  -webkit-border-radius: 0px 0px 11px 11px;
  border-radius: 0px 0px 11px 11px;
  border: 1px solid #e2dedc;
  border-top: 1px solid rgb(247, 245, 243);
`;

const DropdownItem = styled.li`
  padding: 4px 8px 4px;
  cursor: pointer;
  user-select: none;
  &:hover {
    background: #f0f0f0;
  }
`;

const Triangle = styled.span`
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 6px solid #898989;
  margin-left: 10px;
  border-radius: 2px;
`;

const DropdownComponent = <T,>(props: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const [selected, setSelected] = React.useState<DropdownOption<T> | undefined>();

  const [options, setOptions] = React.useState<DropdownOption<T>[]>([]);

  React.useEffect(() => {
    if (props.options) {
      setOptions(props.options);
      setSelected(props.options[0]);
    }
  }, [props.options]);

  React.useEffect(() => {
    if (props.selected !== undefined) {
      setSelected(options.find((el) => el.value == props.selected));
    }
  }, [options, props.selected]);

  React.useEffect(() => {
    if (selected !== undefined) props.onSelected?.(selected.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: DropdownOption<T>) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <Dropdown>
      <DropdownBox $open={isOpen} onClick={toggleDropdown}>
        {selected ? selected.label : <span></span>}
        <Triangle />
      </DropdownBox>
      {isOpen && (
        <DropdownMenu>
          {options.map((option, index) => (
            <DropdownItem key={index} onClick={() => handleSelect(option)}>
              {option.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default DropdownComponent;
