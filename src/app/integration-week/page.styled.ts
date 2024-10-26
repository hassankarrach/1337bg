import {styled} from "styled-components";


export const StyledPage = styled.div`
	width : 100%;
	height: 100vh;
	padding : 5px;
	padding-left : 5vw;
	display : flex;
	flex-direction : row;
	justify-content : flex-start;
	/* align-items : center; */
	/* background-color: var(--main_background); */

	.Left{
		width : 40%;
		height: 100%;
		background-color: var(--sec_background);
		background-image: url('/integration-week.jpg');
		background-size: cover;
		background-position: center;
		border-radius : 5px;
	}
	.Right{
		flex : 1;
		/* width : 60%; */
		height: 100%;
		padding : 10px;
		padding-right : 50px;
		gap : 10px;
		display : flex;
		flex-direction : column;
		justify-content : center;
		/* align-items  : center; */
		h1{
			color : var(--sec_background);
			opacity : 0.7;
			text-transform : uppercase;
		}
		p{
			font-weight : 300;
		}

		.Bottom{
			display : flex;
			align-items : center;
			height : auto;
			gap : 10px;
			/* padding : 10px; */
			margin-top : 10%;
		}

		.LastJoined{
			display : flex;
			flex-direction : row;
			justify-content : center;
			align-items : center;
			gap : 10px;
			.AvatarsGrp{
				width : auto;
				height : auto;
				display : flex;
				.Avatar{
					width : 40px;
					height : 40px;
					background-color : var(--main_color);
					border : 1px solid var(--border_grey);
					background-position : center;
					background-size : cover;
					border-radius : 50%;
					margin-right : -10px
				}
				.Avatar.Last{
					background-color : var(--light_grey);
					margin-right : 0px;
					display : flex;
					align-items : center;
					justify-content : center;
					color : var(--Par_grey);
				}
			}
		}

		.JoinButton{
			width : 300px;
			height : 45px;
			background-color : var(--main_color);
			border-radius : 3px;
			border : none;
			outline : none;
			border : 1px solid var(--Par_grey);
			color : var(--main_color_dark);
			display : flex;
			justify-content : center;
			align-items : center;
			cursor: pointer;
			transition : 0.2s ease-in-out;
			font-weight : 500;
			font-size : 1.1rem;
			&:hover{
				// dark it a bit filter
				filter : brightness(0.9);

			}
			&:disabled {
				background-color : var(--light_grey);
				color : var(--Par_grey);
				opacity : 0.7;
				cursor : not-allowed;
			}
		}
	}
`