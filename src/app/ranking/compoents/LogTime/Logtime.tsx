import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FaBullseye, FaChartLine, FaCalendar } from "react-icons/fa";

interface StyledLogTimeProps {
  percentage: number;
}
const StyledLogTime = styled.div<StyledLogTimeProps>`
  width: 100%;
  height: auto;
  background-color: #212125;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 2px 5px;

  .Requirements {
    display: flex;
    .req_el {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 3px;
      color: white;
      span {
        color: white;
        opacity: 0.7;
      }
    }
  }

  .CaculateLogTimeButton {
    cursor: pointer;
    width: 100%;
    height: 50px;
    border-radius: 5px;
    background-color: var(--main_color);
    border: none;
    outline: none;
    color: var(--main_color_dark);
    font-family: var(--main_font);
    font-weight: 700;
    text-transform: uppercase;
  }

  .ProgBar {
    width: 100%;
    border-radius: 5px;
    height: 50px;
    background-color: var(--sec_background);
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px;
    z-index: 2;
    overflow: hidden;
    position: relative;
    .ReqLogTime {
      color: white;
      font-size: 1.5rem;
      z-index: 1;
      opacity: 0.4;
    }

    .LogTimeGoal {
      width: ${(props) => props.percentage}%;
      position: absolute;
      height: 100%;
      border-radius: 3px;
      padding: 0px 5px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      left: 0;
      top: 0;
      background: linear-gradient(
        90deg,
        rgba(92, 131, 10, 0) 0%,
        rgba(204, 255, 97, 0.7) 100%
      );
      box-shadow: rgba(0, 0, 0, 0.95) 0px 5px 15px;
      background-color: var(--sec_background);
      z-index: 9999;

      /* &:after{
		width : 100%;
		height : 100%;
		content : "";
		position : absolute;
		left : 0;
		top : 0;
		background-color : var(--sec_background);
	} */
      .CurrLogTime {
        color: white;
        font-size: 1.5rem;
        //no-wrap
        white-space: nowrap;
        /* background-color  :blue; */
        .Perc{
          color: white;
          font-size: 1.3rem;
          display : ${props => props.percentage < 30 ? "none" : "auto"};
        }
      }
    }
  }
`;

const Logtime = () => {
  const { data: session } = useSession();
  const [CalculationModeActivated, setCalculationModeActivated] =
    useState(false);
  const [TotalLogTime, setTotalLogTime] = useState(0);
  const [RemainingMinutes, setRemainingMinutes] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const requiredLogTime = 120; // 120 hours

  // hit post request to create user /api/students/create
  const fetchData = async () => {
    setCalculationModeActivated(true);
    if (session) {
      try {
        const res = await fetch(`/api/logtime?user_id=${session.user.id}`, {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
        });
        const data = await res.json();

        setTotalLogTime(data.TotalLogTime);
        setRemainingMinutes(data.TotalLogMinutes);
        // Calculate percentage 0 - 100%
        const calculatedPercentage = Math.floor((data.TotalLogTime / requiredLogTime) * 100);
        setPercentage(Math.min(calculatedPercentage, 100));
      } catch (error) {
        toast.error("Error Calculating Logtime.");
      }
    } else {
      toast.error("Please login first");
    }
  };

  return (
    <div>
      <StyledLogTime percentage={percentage}>
        <div className="Requirements">
          <div className="req_el">
            <FaBullseye />
            <span> 120H</span>
          </div>
          <div className="req_el">
            <FaChartLine />
            <span>
              {" "}
              {TotalLogTime}h, {RemainingMinutes}minutes
            </span>
          </div>
          <div className="req_el">
            <FaCalendar />
            <span>08/27 - 09/27</span>
          </div>
        </div>
        {CalculationModeActivated ? (
          <>
            <div className="ProgBar">
              <span className="ReqLogTime">120H</span>

              <div className="LogTimeGoal">
                <span className="CurrLogTime">
                  {TotalLogTime}H <span className="Perc">({percentage}%)</span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <button onClick={fetchData} className="CaculateLogTimeButton">
            Calculate My Logtime.
          </button>
        )}
      </StyledLogTime>
    </div>
  );
};

export default Logtime;
