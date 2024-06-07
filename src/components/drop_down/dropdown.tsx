import React from 'react';
import { Select as BaseSelect, SelectProps, SelectRootSlotProps } from '@mui/base/Select';
import { Option as BaseOption } from '@mui/base/Option';
import { styled } from '@mui/system';

interface CustomDropDownProps {
  data: string[];
  onChange: (value: string) => void;
}

export default function CustomDropDown({ data, onChange }: CustomDropDownProps) {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(data[0]);

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedItem(newValue);
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <div>
      <Select
        value={selectedItem}
        onChange={handleChange}
      >
        {data.map((item) => (
          <Option key={item} value={item}>
            {item}
          </Option>
        ))}
      </Select>
    </div>
  );
}

function Select<TValue extends string>(props: SelectProps<TValue, false>) {
  const slots: SelectProps<TValue, false>['slots'] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} slots={slots} />;
}

const Button = React.forwardRef(function Button<TValue extends string>(
  props: SelectRootSlotProps<TValue, false>,
  ref: React.ForwardedRef<HTMLButtonElement>,
) {
  const { ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
    </StyledButton>
  );
});

const StyledButton = styled('button')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 200px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  border: 1px solid #e5eaf2;
  color: #1c2025;
  position: relative;
  box-shadow: 0px 2px 2px #f3f6f9;
  transition: all 120ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: #f3f6f9;
    border-color: #dae2ed;
  }
`;

const Listbox = styled('ul')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 12px 0;
  min-width: 320px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: #fff;
  border: 1px solid #e5eaf2;
  color: #1c2025;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05);
`;

const Option = styled(BaseOption)`
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.Mui-selected {
    background-color: #daecff;
    color: #3399ff;
  }

  &.Mui-highlighted {
    background-color: #f3f6f9;
    color: #1c2025;
  }

  &:focus-visible {
    outline: 3px solid #3399ff;
  }

  &.Mui-highlighted.Mui-selected {
    background-color: #daecff;
    color: #3399ff;
  }

  &.Mui-disabled {
    color: #dae2ed;
  }

  &:hover:not(.Mui-disabled) {
    background-color: #f3f6f9;
    color: #1c2025;
  }
`;

const Popup = styled('div')`
  z-index: 1;
`;
