import React from "react";
import styled from "styled-components";

const StyledVsCard = styled.div`
  width: 100%;
  height: 70px;
  border-radius: 5px;
  /* border : 1px solid var(--sec_background); */
  display : flex;
  justify-content : space-between;
  align-items : center;
  margin-bottom : 20px;
  /* overflow : hidden; */

  //gradient border bottom
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(90deg, rgba(255,217,0,0.0018382352941176405) 0%, rgba(255,217,0,0.5) 50%, rgba(255,217,0,0) 100%);
  border-image-slice: 1;
  border-width: 0 0 1px 0; /* Only show the bottom border */
  position : relative;

  .VsIcon{
	width : 150px;
	margin-bottom : 40px;
  }

  .User{
	height : 100%;
	display : flex;
	justify-content : flex-end;
	background : ${true ? 'linear-gradient(-45deg, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0) 80%)' : 'linear-gradient(-45deg, rgba( 255, 255, 255, 0.18 ) 0%, rgba( 255, 255, 255, 0 ) 80%)'};
	border-right : 3px solid yellow;
	&:nth-child(1){
		justify-content : flex-start;
		background :  ${false ? 'linear-gradient(45deg, rgba(255, 215, 0, 1) 0%, rgba(255, 215, 0, 0) 80%)' : 'linear-gradient(45deg, rgba( 255, 255, 255, 0.18 ) 0%, rgba( 255, 255, 255, 0 ) 80%)'};
		border-right : none;
		border-left : 3px solid yellow;
	}
	
	//sec schild

	align-items : center;
	gap : 15px;
	flex  : 1;
	.Avatar{
		width : 60px;
		height : 100%;
		background-color : white;
		background-position : center;
		background-size : cover;
		background-image : url('https://www.w3schools.com/howto/img_avatar.png');
	}
	h1{
		font-family : var(--main_font);
		font-size : 1.3rem;
		font-weight : 400;
		color : white;
	}
  }

  .Stats{
	width : 300px;
	height: 50px;
	padding : 5px 10px;
	position : absolute;
	bottom :-10px;
	left : 50%;
	transform : translateX(-50%);
	display : flex;
	justify-content : center;
	align-items : center;
	//blur morphsim
	backdrop-filter: blur( 4px );
	-webkit-backdrop-filter: blur( 4px );
	border-radius: 5px;
	border: 1px solid rgba( 255, 255, 255, 0.18 );
	span{
		color : white;
	}
  }
`;

const VsCard = () => {
  return <StyledVsCard>
	<div className="User">
		<div className="Avatar">
			
		</div>
		<h1>John Doe</h1>
	</div>

	<img className="VsIcon" src='/vs.svg' alt="Vs" />

	<div className="User">
		<h1>John Doe</h1>
		<div className="Avatar">
			
		</div>
	</div>


	<div className="Stats">
		<span>GAME 2</span>
	</div>
  </StyledVsCard>;
};

export default VsCard;
