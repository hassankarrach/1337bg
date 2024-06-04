import styled from 'styled-components';

export const StyledRanking = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction  :column;
    padding : 15% 6%;
    background-color : var(--light_grey);

    .Filter{
        width : 100%;
        height : 70px;
        border-radius : 10px;
        background-color : white;
        border : 1px solid var(--border_grey);
        display : flex;
        justify-content : center;
        align-items : center;
        
        .Select_container{
            width : 300px;
            height: 100%;
            font-family : var(--main_font);
            position : relative;
            .Select_box{
                width : 200px;
                background-color : white;
                padding : 10px 15px;
                border : 1px solid var(--border_grey);
                border-radius : 5px;
                outline : none;
                .Select_option{
                    height : 60px !important;
                    outline : none;
                    border : none;
                }
            }
        }
    }

`