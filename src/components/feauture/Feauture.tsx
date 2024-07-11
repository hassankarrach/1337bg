import React from 'react';
import styled from 'styled-components';


const StyledFeauture = styled.div`
    width : 100%;
    height : 100vh;
    background-color : var(--main_background);
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction : column;
    background-image :linear-gradient(0deg, rgba(10,11,20,1) 0%, rgba(10,11,20,0.8029586834733894) 100%), url('/header.jpg');
    background-position : center 80%;
    background-size : cover;
    h1 {
        color : white;
    }
    p{
        padding : 10px 0px;
        a{
            text-decoration : none;
            color : var(--main_color_light);
        }
    }
`
const Feauture = () => {
    return <StyledFeauture>
        <h1>Just experimenting here, We'll see how it goes!</h1>
        <p>If you're interested or want to practice your skills, feel free to contribute:   <a href="https://www.github.com/hassankarrach/1337bg" target='_blank'>Repo</a>
        </p>
    </StyledFeauture>;
}


export default Feauture;