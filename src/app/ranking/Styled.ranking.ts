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