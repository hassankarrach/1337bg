import styled from 'styled-components';

interface StyledCardProps {
    // BannerImg: string;
}


export const StyledRanking = styled.div`
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content : center;
    align-items : center;
    flex-direction  :column;
    padding : 15% 6%;
    background-color : var(--main_background);
    /* background-color :#FAFBF4; */
    
    .Options{
        width : 100%;
        border-radius : 5px;
        display : flex;
        position : relative;
        
        .Filters{
            width : 100%;
            display : flex;
            align-items : flex-end;
            justify-content : space-between;
            gap : 8px;
            padding : 10px 0px;
            .Select_container{
                flex-grow : 1;
            }
            .SearchUser{
                flex-grow : 1;
                height : 100%;
                display : flex;
                align-items : flex-end;
                input { 
                    height : 38px;
                    width: 100%;
                    border : 1px solid var(--border_grey);
                    border-radius : 7px;
                    padding : 10px;
                    color : var(--main_color);
                    outline : none;
                }
            }
            .ToMeButton{
            flex-grow : 1;
            height : 38px;
            border-radius : 7px;
            cursor : pointer;
            border: 1px solid var(--border_grey);
            background-color : var(--light_blue);
            color : white;
            font-size : 0.9rem;
            justify-self : right;
            margin-left: auto;
            }
            .GenderFilter{
                flex-grow : 1;
                height : 38px;
                border-radius : 5px;
                border : 1px solid var(--border_grey);
                display : flex;
                overflow  :hidden;
                .Male {
                    color : #c3e8ff;
                }

                .Female{
                    color : #ffb6c1;
                }
                .All{
                    /* background-color : red; */
                }
                .All.selected{
                    background-color : var(--light_blue);
                    color : white;
                    .gender_type{
                        color : white;
                    }
                }
                .Male.selected{
                    background-color : var(--light_blue);
                    color : white;
                    .gender_type{
                        color : white;
                    }
                }
                .Female.selected{
                    background-color : var(--light_blue);
                    color : white;
                    .gender_type{
                        color : white;
                    }
                }

                .Male, .Female, .All{
                    flex-grow: 1;
                    display : flex;
                    justify-content :center;
                    align-items : center;
                    padding : 0px 5px; 
                    cursor: pointer;
                    .GenderIcon{
                        size : 50px;
                    }
                }
                .devider{
                        width : 1px;
                        height : 100%;
                        background : linear-gradient(0deg, rgba(231,231,231,0) 0%, rgba(231,231,231,1) 50%, rgba(231,231,231,0) 100%);
                }
            }
        }


    }
    //Test : feeling weird:because of what. t
    .Container
    {
        width : 100%;
        height : 600px;
        background-color : #0E0F19;
        border-radius : 5px;
        display : flex;
        justify-content : center;
        align-items : center;
        margin-top : 5px;
        border : 1px solid var(--border_grey);
        position : relative;
        
        .Ranking{
            width : 65%;
            height: 600px;
            padding : 5px 10px;
            display : flex;
            flex-direction : column;
            .Profiles_container{
                overflow-y : scroll;
                display : flex;
                flex-direction : column;
                padding-right :5px;
                gap : 5px;
                .FetchMore{
                    width : 100%;
                    display : flex;
                    justify-content : center;
                    align-items : center;
                    padding : 10px;
                }
                .Animated{
                    animation: fadeInOut 1s infinite;
                }
                /* Scrollbar styles */
                &::-webkit-scrollbar {
                  width: 8px; /* Width of the scroll bar */
                }
                &::-webkit-scrollbar-track {
                  background: var(--light_grey); 
                  border-radius: 2px;
                }
                &::-webkit-scrollbar-thumb {
                  background: var(--border_grey); 
                  border-radius: 10px;
                  transition : 2s ease-in-out;
                }
                &::-webkit-scrollbar-thumb:hover {
                  background: var(--Header_grey); 
}
            }
            .Skeletons{
            display : flex;
            flex-direction : column;
            padding-right :5px;
            gap : 5px;
            position  :relative;
            .CardSkl{
                border-radius : 5px;
            }
            .profileSkl{
                top : 0;
                position  :absolute;
            }
            }
        }
    }
`