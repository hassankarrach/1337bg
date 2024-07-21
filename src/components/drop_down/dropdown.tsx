import React, { useEffect, useState } from 'react';
import { Select as BaseSelect, SelectProps, SelectRootSlotProps } from '@mui/base/Select';
import { Option as BaseOption } from '@mui/base/Option';
import { styled } from '@mui/system';
import { FaBookmark } from "react-icons/fa";


interface CustomDropDownProps<T> {
  data: T[];
  getValue: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;
  onChange: (value: string) => void;
}

export default function CustomDropDown<T>({ data, getValue, renderItem, onChange }: CustomDropDownProps<T>) {
  const [selectedItem, setSelectedItem] = useState<string | null>(getValue(data[0]));

  const handleChange = (event: any, newValue: string | null) => {
    setSelectedItem(newValue);
    if (newValue) {
      onChange(newValue);
    }
  };
  

  return (
      <Select value={selectedItem} onChange={handleChange}>
        {data.map((item) => {
          const value = getValue(item);
          return (
            <Option key={value} value={value}>
              <FaBookmark color={(item as any).sec_color} className='IconOption'/>
              {renderItem(item)}
            </Option>
          );
        })}
      </Select>
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
  border-radius: 5px;
  text-align: left;
  line-height: 1.5;
  background: #fff;
  color: #1c2025;
  position: relative;
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(44, 44, 48, 1);
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;

  &:hover {
    background: rgba(44, 44, 48, 1);
  }

  /* Add arrow icon */
  &::after {
    content: '';
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    border: solid rgba(255, 255, 255, 0.5);
    border-width: 0 2px 2px 0;
    padding: 3px;
    display: inline-block;
    transform: translateY(-50%) rotate(45deg);
  }

  &[aria-expanded="true"]::after {
    transform: translateY(-50%) rotate(-135deg);
  }
`;


const Listbox = styled('ul')`
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 3px;
  margin: 12px 0;
  min-width: 220px;
  border-radius: 8px;
  overflow: auto;
  outline: 0px;
  background: rgba(10,11,20, 0.8);
  border: 1px solid rgba(44,44,48,1);
  color: white;
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  font-family : var(--main_font);
  /* box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.05); */
`;

const Option = styled(BaseOption)`
  width: 100%;
  list-style: none;
  padding: 8px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  cursor: pointer;

  .IconOption {
    margin-right: 5px;
  }

  &:last-of-type {
    border-bottom: none;
  }

  &[aria-selected="true"] {
    background-color: var(--main_color_light);
    color: var(--main_color_dark);
  }

  &[data-highlighted="true"] {
    background-color: #f3f6f9;
    color: #1c2025;
  }

  &:focus-visible {
    outline: 3px solid #3399ff;
  }

  &[aria-selected="true"][data-highlighted="true"] {
    background-color: #daecff;
    color: #3399ff;
  }

  &[aria-disabled="true"] {
    color: #dae2ed;
  }

  &:hover:not([aria-disabled="true"]) {
    background-color: rgba(44, 44, 48, 1);
    color: white;
  }
`;

const Popup = styled('div')`
  z-index : 999;
`;
