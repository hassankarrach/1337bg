import React from 'react';
import styled from 'styled-components';



interface ComponentProps {
    title : string,
    value : string,
    by : string,
}

interface StyleProps {
    value : string
}

const StyledRncpItem = styled.div<StyleProps>`
                    padding : 3px 5px;
                    border-radius : 4px;
                    border : 1px solid var(--border_grey);
                    position : relative;
                    cursor: pointer;
                    /* flex: 1 1 auto; */
                    display : flex;
                    justify-content :center;
                    align-items : center;
                    &:after{
                        content :"";
                        left : 0;
                        bottom : 0;
                        position : absolute;
                        width : ${(props : any) => (props.value / 21) * 100}%;
                        height : 10%;
                        background-color : #a8e6cf;
                        z-index : -1;
                    }
                    &:before{
                        content : "";
                        left : 0;
                        bottom: 0;
                        position : absolute;
                        width : 100%;
                        height : 10%;
                        background-color : var(--border_grey);
                        z-index : -2;
                    }
                    display : flex;
                    justify-content : space-between;
                    .value{
                        width : 50px;
                        background-color :var(--light_grey);
                        padding : 0px 10px;
                        display : flex;
                        justify-content : center;
                        align-items : center;
                    }
                    .devide{
                        padding : 0px 5px;
                    }
                    .by{
                        padding : 0px 10px;
                        margin-right : auto;
                    }
                    .title{
                        padding : 0px 3px;
                        width : 30%;
                    }
`

const RncpItem : React.FC<ComponentProps>  = ({title, value, by}) => {
    return <StyledRncpItem value={value}>
        <span className='value'>{value}</span>
        <span className='devide'>/</span>
        <span className='by'>{by}</span>
        <span className='title'>{title}</span>
    </StyledRncpItem>;
}

export default RncpItem;


{/* <div className='Progress_item'>
<span>0 / 4 Events</span>
</div>
<div className='Progress_item'>
<span>0 / 2 Experiances</span>
</div> */}