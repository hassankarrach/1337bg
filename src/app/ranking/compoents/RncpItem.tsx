import React from "react";
import styled from "styled-components";

interface ComponentProps {
  title: string;
  value: string;
  by: string;
}

interface StyleProps {
  value: string;
}

const StyledRncpItem = styled.div<StyleProps>`
  padding: 3px 5px;
  border-radius: 4px;
  border: 1px solid rgba(44,44,48,1);
  position: relative;
  overflow : hidden;
  padding : 5px;
  padding-bottom : 10px;
  cursor: pointer;
  /* flex: 1 1 auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: "";
    left: 0;
    bottom: 0;
    position: absolute;
    width: ${(props: any) => (props.value / 21) * 100}%;
    height: 10%;
    background-color: rgba(183,251,43,0.3);
  }
  &:before {
    content: "";
    left: 0;
    bottom: 0;
    position: absolute;
    width: 100%;
    height: 10%;
    background-color: rgba(44,44,48,1);
  }
  display: flex;
  justify-content: space-between;
  .value {
    width: 50px;
    border-radius : 4px;
    background-color: rgba(44,44,48,1);
    padding: 0px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family : var(--main_font);
    padding : 4px 5px;
  }
  .devide {
    padding: 0px 5px;
    font-family : var(--main_font);
    color : rgba(255, 255, 255, 0.55);
  }
  .by {
    padding: 0px 10px;
    margin-right: auto;
    font-family : var(--main_font);
    color : rgba(255, 255, 255, 0.55);
  }
  .title {
    font-family : var(--main_font);
    padding: 0px 3px;
    width: 30%;
    color : rgba(255, 255, 255, 0.55);
  }
`;

const RncpItem: React.FC<ComponentProps> = ({ title, value, by }) => {
  return (
    <StyledRncpItem value={value}>
      <span className="value">{value}</span>
      <span className="devide">/</span>
      <span className="by">{by}</span>
      <span className="title">{title}</span>
    </StyledRncpItem>
  );
};

export default RncpItem;

{
  /* <div className='Progress_item'>
<span>0 / 4 Events</span>
</div>
<div className='Progress_item'>
<span>0 / 2 Experiances</span>
</div> */
}
