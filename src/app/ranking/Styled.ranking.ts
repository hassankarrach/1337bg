import styled from 'styled-components';

interface StyledCardProps {
    // BannerImg: string;
}


export const StyledRanking = styled.div`
    width : 100vw;
    height : auto;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction  :column;
    padding : 15% 6%;
    background-color : var(--light_grey);
    /* background-color :#FAFBF4; */
    
    .Options{
        width : 100%;
        height : auto;
        padding-bottom : 10px;
        border-radius : 5px;
        display : flex;
        position : relative;
        
        .Filters{
            display : flex;
            gap : 15px;
        }
    }

    .Container
    {
        width : 100%;
        height : auto;
        background-color : white;
        border-radius : 5px;
        display : flex;
        justify-content : center;
        align-items : center;
        margin-top : 5px;
        border : 1px solid var(--border_grey);
        overflow : hidden;
        position : relative;
        
        .Profile{
            width : 35%;
            height : 800px;
            background-color : #fafafa;
            border-radius : 5px;
            position  :sticky;
            top :0;
            left : 0;
            overflow : hidden;
            padding : 5px;
            /* border: 1px solid pink; */
            
            .Profile_banner{
                width : 100%;
                height : 150px;
                background-color : black;
                position : relative;
                background-position : center;
                background-size : cover;
                background-repeat : no-repeat;
                border-radius : 5px;
                .Profile_UserIcons{
                    position : absolute;
                    right :0;

                    ._42logo{
                    width : 30px;
                    background-color : transparent;
                    fill : white;
                    margin : 0px 10px;
                    cursor : pointer;
                    transition : 0.2s ease-in-out;
                    &:hover{
                        fill : var(--dark_green);
                    }
                }
                }
                .Profile_avatar{
                    width : 90px;
                    height: 90px;
                    background-color : var(--light_grey);
                    border-radius : 20%;
                    position : absolute;
                    bottom : -15px;
                    left : 10px;
                    background-position : center;
                    background-size : cover;
                    background-repeat : no-repeat;
                    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
                    }
                    .Profile_Infos{
                        display : flex;
                        color : white;
                        flex-direction : column;
                        position  :absolute;
                        margin-left: 110px;
                        bottom : 10px;
                        .Profile_Full_Name{
                            /* text-transform : uppercase; */
                            font-size : 1.4rem;
                            font-weight : 500;
                            text-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
                        }
                        .Profile_UserName{
                            font-weight : 400;
                        }
                    }
            }
        }
        .Ranking{
            width : 65%;
            height: 800px;
            padding : 5px 10px;
            display : flex;
            flex-direction : column;
            gap : 5px;
        }
    }
`