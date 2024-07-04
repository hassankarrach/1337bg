import styled from "styled-components";

export const StyledNavbar = styled.div`
  position: fixed;
  top: 0;
  z-index: 999;
  right: 10px;
  top: 10px;
  display : flex;
  gap : 5px;

  .Profile {
    width: 200px;
    height: 40px;
    border-radius: 5px;
    padding: 2px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    background: rgba(195, 185, 252, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.06);

    .UserInfo {
      height: 100%;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      justify-content: center;
      padding: 10px 5px;
      /* justify-content : flex-end; */

      .User_name {
        /* color: var(--main_color); */
        font-weight: 400;
        /* text-transform: uppercase; */
      }
      .online {
        display: flex;
        align-items: center;
        justify-content: flex-end;

        .online_dot {
          width: 8px;
          height: 8px;
          background-color: red;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
    }

    .Avatar {
      width: 35px;
      height: 100%;
      background-color: white;
      border-radius: 3px;
      background-position: center;
      background-size: cover;
      transition: 0.2s ease-in-out;
      position: relative;
      overflow: hidden;

      &:hover {
        /* border : 1px solid var(--main_color); */
        &:after {
          content: "";
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: var(--main_color);
          opacity: 0.1;
        }
      }
    }
  }

  .Nav_item{
    width : 40px;
    height : 40px;
    background: rgba(195, 185, 252, 0.15);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 5px;
    cursor: pointer;
    display : flex;
    justify-content : center;
    align-items : center;
    
    
    &:hover{
        .Nav_item_icon{
            opacity : 1;
        }
    }

    .Nav_item_icon{
        color : var(--main_color);
        opacity : 0.7;
        transition : 0.2s ease-in-out;
    }
  }
`;
