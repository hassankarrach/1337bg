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
        height : 600px;
        background-color : white;
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
            .Skeleton{
                border-radius : 3px;
            }
            }
        }
    }
`