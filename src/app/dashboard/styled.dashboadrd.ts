import { styled } from "styled-components";


const StyledDashboard = styled.div`
    width : 100vw;
    height: 100vh;
    background-color : #f4f4f4;
    display : flex;
    justify-content : center;
    align-items : center;

    .Services_container
    {
        background-color : transparent;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
`

export default StyledDashboard;