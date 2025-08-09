"use client";
import Feauture from "@/components/feauture/Feauture";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import BlackHoledCard from "./components/bkackHoledCard";
import CustomDropDown from "@/components/drop_down/dropdown";
import { Promos } from "@/data/Promos";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";
import { FaArrowsAlt } from "react-icons/fa";
import useSessionEnd from "@/hooks/useSessionEnd";

interface StyledRowProps {
  $is_even: boolean;
  $index: number;
}
const StyledRow = styled.div<StyledRowProps>`
  width: auto;
  padding: 20px 0px;
  height: auto;
  display: flex;
  align-items: center;
  gap: 40px;
  flex-direction: row;
  margin-left: ${(props) => (props.$is_even ? "70px" : "")};
  margin-top: ${(props) => (props.$index != 0 ? "-60px" : "")};
  .Skeleton {
    min-width: 100px;
    min-height: 100px;
    background-color: rgba(33, 33, 37, 1);
    border-radius: 6px;
    transform: rotate(45deg);
  }
`;

interface RowProps {
  is_even: boolean;
  is_loading: boolean;
  index: number;
  elements: any[];
}

const Row: React.FC<RowProps> = ({ is_even, elements, index, is_loading }) => {
  const daysBetweenDates = (dateString: string): number => {
    const givenDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - givenDate.getTime();
    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return dayDifference;
  };

  return (
    <StyledRow $is_even={is_even} $index={index}>
      {is_loading
        ? elements.map((el, key) => {
            return (
              <Skeleton
                className="Skeleton"
                animation="pulse"
                variant="rectangular"
                key={key}
              />
            );
          })
        : elements.map((el, key) => {
            // console.log(el);
            // console.log(daysBetweenDates(el.blackholed_at));
            return (
              <BlackHoledCard
                $index={1}
                $level={el.level}
                $avatar={el.user.image.versions.small}
                $is_blackholed={!el.user["active?"]}
                key={key}
                url={`https://profile.intra.42.fr/users/${el.user.login}`}
              />
            );
          })}
    </StyledRow>
  );
};

const StyledBlackhole = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--main_background);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  .CardsContainer {
    width: 100%;
    height: auto;
    overflow-x: scroll;
    overflow-y: scroll;
    padding: 0px 30px;
    cursor: grab;
    .drag_icon {
      position: absolute;
      top: 55%;
      color: white;
      background: rgba(44, 44, 48, 0.5);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      cursor: pointer;
      z-index: 999;
      right: 10px;
      border-radius: 5px;
      padding: 2px;
      @media only screen and (max-width: 767px) {
        top: 50%;
      }
    }
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .Bottom_container {
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 767px) {
      height: 30%;
    }
    .Last_blackholed,
    .Close_to_blackhole,
    .Center {
      flex: 1;
    }
    .Center {
      min-width: 33%;
      min-height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      @media only screen and (max-width: 767px) {
        padding: 0px 10px;
      }
      h1 {
        font-size: 3rem;
        text-transform: uppercase;
        color: var(--main_color_light);
      }
    }
    .Last_blackholed {
      min-width: 33%;
      min-height: 100%;
      @media only screen and (max-width: 767px) {
        display: none;
      }
    }
    .Close_to_blackhole {
      min-width: 33%;
      min-height: 100%;
      @media only screen and (max-width: 767px) {
        display: none;
      }
    }
  }
`;
const Page = () => {
  const { data: session } = useSession();
  const [Users, setUsers] = useState([]);
  const [SelectedPromo, setSelectedPromo] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useSessionEnd();

  const handlePromoChange = (value: string) => {
    setUsers([]);
    const promoId = parseInt(value, 10);
    setSelectedPromo(promoId);
  };

  const getUserByimpact = async () => {
    const url = `/api/blackholed?start_date=${Promos.find((promo) => promo.id === SelectedPromo)?.start_date}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch Students.");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ["near_bh", SelectedPromo],
    queryFn: getUserByimpact,
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: !!session?.accessToken && !!session,
  });

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let isDown = false;
    let startX: number, startY: number, scrollLeft: number, scrollTop: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.classList.add("active");
      startX = e.pageX - container.offsetLeft;
      startY = e.pageY - container.offsetTop;
      scrollLeft = container.scrollLeft;
      scrollTop = container.scrollTop;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.classList.remove("active");
    };

    const handleMouseUp = () => {
      isDown = false;
      container.classList.remove("active");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const y = e.pageY - container.offsetTop;
      const walkX = (x - startX) * 2; // Adjust the scroll speed
      const walkY = (y - startY) * 2; // Adjust the scroll speed
      container.scrollLeft = scrollLeft - walkX;
      container.scrollTop = scrollTop - walkY;
    };

    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("mouseleave", handleMouseLeave);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("mouseleave", handleMouseLeave);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Render Cards
  const Skeletons: any[] = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    user: {
      image: {
        versions: {
          // just to avoid undefined image (skeleton), when data is loaded.
        },
      },
    },
  }));

  const rows = (Users.length > 0 ? Users : Skeletons).reduce<any[][]>(
    (acc, user, i) => {
      if (i % 20 === 0) acc.push([]);
      acc[acc.length - 1].push(user);
      return acc;
    },
    []
  );

  return (
    <StyledBlackhole>
      <div className="CardsContainer" ref={containerRef}>
        <FaArrowsAlt className="drag_icon" size={25} />
        {rows.map((row, index) => (
          <Row
            key={index}
            index={index}
            elements={row}
            is_even={!(index % 2 == 0)}
            is_loading={!Users[0]}
          />
        ))}
      </div>
      <div className="Bottom_container">
        <div className="Last_blackholed"></div>
        <div className="Center">
          <h1>BlackHole</h1>
          <CustomDropDown
            data={Object.values(Promos).slice(1)}
            getValue={(item) => item.id.toString()}
            renderItem={(item) => item.Name}
            onChange={handlePromoChange}
          />
          <p>
            <strong>Disclaimer:</strong>
            <br />
            This page is for testing UI styles and may not reflect accurate
            student statuses. Inactive accounts might appear as "blackholed" due
            to limitations in the 42 API, which doesn't clearly show those at
            risk. Please don't rely on this data for accurate information.
          </p>
        </div>
        <div className="Close_to_blackhole"></div>
      </div>
    </StyledBlackhole>
  );
};

export default Page;
