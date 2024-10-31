import styled from "styled-components";

export const StyledLeaderboard = styled.div`
	width : 100vw;
	height: auto;
	background-color: #0A0B14;
	padding : 5px 0px;
	min-height : 100vh;
	padding-left : 5%;

	@media (max-width: 768px) {
		padding-left : 0px;
		display : flex;
		flex-direction : column;
		.Banner{
			height : 100%;
		}
	}

	.Banner{
		width : 100%;
		height : 250px;
		background-color : #212125;
		background-image: linear-gradient(0deg, rgba(255,217,0,1) 0%, rgba(255,217,0,0) 100%), url('/integration-week2.png');
		background-position : center 40%;
		background-size : cover;
		overflow : hidden;
		position : relative;
		border-radius : 5px;
		padding : 10px;
		display : flex;
		justify-content : flex-start;
		align-items : center;
		h1{
			color : transparent;
			text-transform : uppercase;
			position : absolute;
			font-size : 5rem;
			left : 15px;
			//text outline
			-webkit-text-stroke-width: 1px;
			-webkit-text-stroke-color: rgba(255,255, 255, 1);

		font-size : 1.9rem;
		}
		display : flex;
		justify-content : center;
		align-items : center;
	}

	.Container{
		width : 100%;
		height: auto;
		gap : 1;
		display : flex;
		flex-direction : column;
		padding : 10px 0px;

		.Options{
			width  :100%;
			height : 50px;
			display : flex;
			justify-content : flex-start;
			align-items : center;
			
			.SwitchEl{
				height : 40px;
				border-radius : 2px;
				background-color : rgba(255, 230, 128, 1);
				color : rgba(204, 172, 0, 0.5);
				display : flex;
				justify-content : center;
				align-items : center;
				padding : 0px 10px;
				overflow : hidden;
				cursor: pointer;
				transition : 0.2s ease-in-out;
				font-family : var(--main_font);
				font-size : 1.2rem;
				font-weight : 400;
				&:hover {
					background-color : rgba(255, 240, 179, 1);
				}
				&.active{
					background-color : rgba(255, 215, 1);
					color : rgba(153, 129, 0, 1);
				}
				&:first-child{
					border-top-right-radius : 0px;
					border-bottom-right-radius : 0px;
				}
				&:last-child{
					border-top-left-radius : 0px;
					border-bottom-left-radius : 0px;
				}

			}
			.Switch{
				width : fit-content;
				display : flex;
				border-radius : 5px;
				overflow : hidden;
			}
		}
		
		.GamesSection{
			padding-top : 10px;
			min-height :100vh;
			width : 100%;
			background-color : #212125;
			display : flex;
			flex-direction : column;
			justify-content : flex-start;
			gap : 5px;
			align-items : center;
		}

		.Leaderboard{
			padding-top : 10px;
			min-height : 100vh;
			width : 100%;
			height: auto;
			background-color : #212125;
			display : flex;
			flex-direction : column;
			gap : 5px;
			border : 2px solid black;
		}
	}
`