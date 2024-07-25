import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { Span } from "next/dist/trace";
import { Skeleton } from "@mui/material";

interface PoolerItemProps {
  avatar: string;
  rank?: number;
  login?: string;
  level?: number;
  campus?: string;
}
const StyledPoolerItem = styled.div<PoolerItemProps>`
  width: 80%;
  height: 25%;
  /* flex: 1; */
  background: rgba(10, 11, 20, 0.25);
  /* box-shadow: 0 8px 32px 0 rgba(183, 251, 43, 0.05); */
  backdrop-filter: blur(3px);
  -webkit-backdrop-filter: blur(3px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  display: flex;
  flex-direction: row;
  /* align-items: center; */
  /* margin-top: auto; */
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background: linear-gradient(
    0deg,
    rgba(44, 44, 48, 0.9) 0%,
    rgba(44, 44, 48, 0) 100%
  );
  overflow: hidden;
  &:after {
    content: "";
    width: 1%;
    height: 100%;
    background-color: ${(props) =>
      props.rank == 1 ? "#FFD700" : props.rank == 2 ? "#C0C0C0" : "#CD7F32"};
    position: absolute;
    top: 0;
    right: 0;
    z-index: -1;
    opacity: 0.5;
  }

  .CampusName {
    height: 100%;
    width: 10%;
    background: ${(props) =>
      props.rank == 1
        ? "linear-gradient(0deg, rgba(255,215,0,0.3) 0%, rgba(255,215,0,0) 100%)"
        : props.rank == 2
        ? "linear-gradient(0deg, rgba(192,192,192,0.3) 0%, rgba(192,192,192,0) 100%)"
        : "linear-gradient(0deg, rgba(205,127,50,0.3) 0%, rgba(205,127,50,0) 100%)"};
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      transform: rotate(-90deg);
      font-family: var(--playable_font);
      color: ${(props) =>
        props.rank == 1 ? "#FFD700" : props.rank == 2 ? "#C0C0C0" : "#CD7F32"};
    }
  }

  .PromoDetails {
    z-index: 999;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-family: var(--playable_font);
    }
  }
  /* align-items  : flex-start; */
  .PromoAvatar {
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    /* align-items : center; */
    align-items: flex-end;
    /* padding: 5px; */
    background-color: var(--main_color);
    /* border-radius: 50%; */
    border-top-left-radius: 8px;
    /* border-bottom-left-radius : 2px; */
    /* border-bottom-right-radius : 2px; */
    background-position: center;
    background-size: cover;
    background-image: ${(props) => `url(${props.avatar})`};
    position: relative;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: ${(props) =>
        props.rank === 1
          ? "linear-gradient(0deg, rgba(255,215,0,1) 0%, rgba(255,215,0,0) 50%)"
          : props.rank === 2
          ? "linear-gradient(0deg, rgba(192,192,192,1) 0%, rgba(192,192,192,0) 50%)"
          : "linear-gradient(0deg, rgba(205,127,50,1) 0%, rgba(205,127,50,0) 50%)"};
    }

    .Assets {
      height: 100%;
      width: 100%;
      position: absolute;
      .Right_svg {
        width: auto;
        height: 50%;
        position: absolute;
        right: 0;
        bottom: 0;
        z-index: 99;
        transform: rotate(9deg);
      }
      .Left_svg {
        width: auto;
        height: 50%;
        position: absolute;
        z-index: 99;
        left: 0;
        bottom: 0;
        transform: rotate(-9deg);
      }
    }

    .UserName {
      h1 {
        font-family: var(--playable_font);
        font-size: 1.1rem;
        transform: skewY(-5deg);
        z-index: 9;
        color: white;
        font-weight: 100;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .PromoPower {
      h1 {
        font-family: var(--playable_font);
        font-size: 1.8rem;
        transform: skewY(-5deg);
        z-index: 9;
        color: white;
        font-weight: 100;
        -webkit-text-stroke: 1px white;
        -webkit-text-fill-color: transparent;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
      }
    }
  }

  span {
    color: white;
    font-weight: 200;
  }
`;
const PoolerItem: React.FC<PoolerItemProps> = ({
  avatar,
  rank,
  login,
  level,
  campus,
}) => {
  return (
    <StyledPoolerItem avatar={avatar} rank={rank}>
      {/* <a href={`https://profile.intra.42.fr/users/${login}`} target="_blank"> */}
      <div className="PromoAvatar">
        <div className="UserName">
          <h1>{login}</h1>
        </div>

        <div className="Assets">
          <svg
            fill={`${
              rank == 1 ? "#FFD700" : rank == 2 ? "#C0C0C0" : "#CD7F32"
            }`}
            height="800px"
            width="800px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 314.587 314.587"
            className="Right_svg"
          >
            <g>
              <path d="m310.307,194.509c-2.497,0.469-5.918,1.118-9.727,2.016 8.442-12.574 14.46-41.666 13.98-55.924 0.051-1.771-0.38-3.566-1.127-4.765-0.748-1.201-1.706-1.651-2.544-1.223-3.474,1.837-8.933,4.733-14.411,8.345 0.9-1.428 1.756-3.018 2.551-4.795 6.176-12.131 2.487-46.022-3.115-60.65-0.524-1.679-1.512-3.223-2.608-4.101-1.096-0.88-2.148-0.981-2.8-0.302-2.789,2.986-7.23,7.749-11.379,13.19-0.014-1.293-0.147-2.631-0.393-4.001 2.102-13.231-12.242-43.693-22.661-55.681-1.072-1.41-2.54-2.54-3.885-3.008-1.346-0.468-2.383-0.219-2.768,0.638-1.411,3.273-3.557,8.248-5.471,13.785-2.22-4.985-6.227-10.512-12.033-15.493-9.922-9.077-33.168-15.012-43.462-15.745-1.174-0.136-2.053,0.168-2.347,0.795-0.295,0.628 0.03,1.494 0.843,2.315 7.72,7.135 20.688,23.841 28.729,31.288 4.859,4.142 9.761,7.572 14.199,9.778-5.508,1.654-10.343,3.935-13.305,5.606-0.807,0.436-1.16,1.364-0.965,2.467 0.194,1.104 0.903,2.242 1.895,3.061 9.274,6.701 25.777,25.302 34.899,31.99 0.096,0.063 0.192,0.121 0.288,0.184 0.724,0.833 1.472,1.613 2.246,2.325-6.622-0.406-13.01,0.37-16.831,1.129-0.894,0.162-1.552,0.893-1.774,1.932-0.222,1.04 0.015,2.255 0.629,3.266 5.982,8.573 15.123,30.065 21.645,38.9 0.993,1.217 2.018,2.341 3.061,3.373-5.814-2.233-11.654-3.43-15.309-3.912-0.896-0.134-1.757,0.326-2.309,1.201-0.552,0.876-0.73,2.055-0.482,3.169 2.547,8.798 4.313,28.389 7.172,39.621-3.277-2.132-6.375-3.772-8.624-4.812-0.817-0.395-1.771-0.221-2.554,0.435-0.783,0.657-1.294,1.711-1.381,2.832-0.096,8.237-3.505,24.881-4.628,36.516-3.053-3.574-6.104-6.505-8.354-8.419-0.788-0.697-1.902-0.828-2.974-0.381-1.072,0.449-1.966,1.412-2.413,2.594-3.036,10.635-16.334,32.776-21.27,44.803-3.73,11.019-3.628,21.193 1.968,25.896-4.979,5.73-9.871,11.331-13.562,14.743-0.813,0.822-1.135,1.687-0.84,2.315 0.295,0.627 1.175,0.931 2.347,0.795 4.912-0.35 12.77-1.885 20.723-4.379 1.837,7.362 11.145,11.753 26.917,8.531 17.89-2.654 50.421-31.974 60.181-48.606 1.253-1.787 2.052-3.914 2.135-5.634 0.084-1.722-0.541-2.81-1.635-2.916-3.073-0.248-7.314-0.6-12.095-0.784 11.396-11.359 23.945-34.641 27.353-47.391 0.575-1.703 0.698-3.572 0.34-4.96-0.356-1.39-1.138-2.112-2.065-1.952z" />
            </g>
          </svg>

          <svg
            fill={`${
              rank == 1 ? "#FFD700" : rank == 2 ? "#C0C0C0" : "#CD7F32"
            }`}
            height="800px"
            width="800px"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 314.587 314.587"
            className="Left_svg"
          >
            <g>
              <path d="m127.637,9.907c0.813-0.822 1.139-1.688 0.843-2.315-0.294-0.628-1.173-0.931-2.347-0.795-10.294,0.733-33.54,6.668-43.462,15.745-5.806,4.981-9.812,10.508-12.033,15.493-1.914-5.537-4.06-10.512-5.471-13.785-0.385-0.858-1.422-1.107-2.768-0.638-1.345,0.468-2.813,1.598-3.885,3.008-10.42,11.989-24.763,42.45-22.662,55.681-0.246,1.37-0.38,2.708-0.393,4.001-4.149-5.441-8.59-10.204-11.379-13.19-0.653-0.68-1.705-0.578-2.8,0.302-1.096,0.878-2.084,2.422-2.608,4.101-5.602,14.627-9.291,48.519-3.115,60.65 0.794,1.777 1.651,3.367 2.551,4.795-5.478-3.612-10.937-6.508-14.411-8.345-0.838-0.427-1.796,0.022-2.544,1.223-0.747,1.199-1.177,2.994-1.127,4.765-0.48,14.258 5.539,43.349 13.98,55.924-3.809-0.898-7.23-1.547-9.727-2.016-0.927-0.161-1.709,0.562-2.067,1.951-0.358,1.388-0.235,3.257 0.34,4.96 3.408,12.749 15.957,36.031 27.353,47.391-4.781,0.184-9.022,0.536-12.095,0.784-1.094,0.106-1.719,1.194-1.635,2.916 0.083,1.72 0.882,3.847 2.135,5.634 9.76,16.632 42.291,45.952 60.181,48.606 15.772,3.222 25.08-1.168 26.917-8.531 7.953,2.494 15.812,4.03 20.724,4.379 1.172,0.136 2.052-0.168 2.347-0.795 0.295-0.627-0.027-1.492-0.84-2.315-3.691-3.411-8.584-9.013-13.562-14.743 5.596-4.702 5.698-14.877 1.968-25.896-4.935-12.026-18.234-34.168-21.27-44.803-0.447-1.181-1.341-2.145-2.413-2.594-1.072-0.447-2.186-0.316-2.974,0.381-2.25,1.914-5.3,4.845-8.354,8.419-1.123-11.635-4.532-28.279-4.628-36.516-0.087-1.121-0.598-2.175-1.381-2.832-0.783-0.655-1.737-0.829-2.554-0.435-2.249,1.04-5.347,2.68-8.624,4.812 2.858-11.232 4.625-30.822 7.172-39.621 0.248-1.115 0.07-2.293-0.481-3.169-0.552-0.875-1.413-1.335-2.309-1.201-3.654,0.482-9.494,1.679-15.308,3.912 1.043-1.032 2.068-2.156 3.061-3.373 6.522-8.835 15.663-30.327 21.645-38.9 0.614-1.011 0.851-2.226 0.629-3.266-0.222-1.039-0.88-1.771-1.774-1.932-3.82-0.759-10.208-1.535-16.831-1.129 0.775-0.712 1.522-1.492 2.246-2.325 0.096-0.062 0.192-0.12 0.288-0.184 9.123-6.688 25.625-25.289 34.899-31.99 0.992-0.818 1.701-1.956 1.895-3.061 0.194-1.104-0.158-2.031-0.965-2.467-2.962-1.671-7.797-3.952-13.305-5.606 4.438-2.206 9.34-5.636 14.199-9.778 8.041-7.446 21.009-24.152 28.729-31.287z" />
            </g>
          </svg>
        </div>

        <div className="PromoPower">
          <h1>#{rank}</h1>
        </div>
      </div>
      {/* </a> */}

      <div className="PromoDetails">
        <span>{level}</span>
      </div>

      <div className="CampusName">
        <span>{campus}</span>
      </div>
    </StyledPoolerItem>
  );
};

const StyledTop3 = styled.div`
  background: linear-gradient(
    0deg,
    rgba(44, 44, 48, 0.9) 0%,
    rgba(44, 44, 48, 0) 100%
  );
  width: 100%;
  flex: 1;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  h1 {
    color: white;
  }
  .Top3_container {
    display: flex;
    height: 90%;
    width: 100%;
    gap: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 0px 5px;
    .skl {
      border-radius: 5px;
      background-color: rgba(44, 44, 48, 0.9);
    }
  }
`;

const Top3 = () => {
  const [Top3Poolers, setTop3Poolers] = useState<any>([]);
  const { data: session } = useSession();

  const getTopPooler = async (id: number) => {
    try {
      const response = await fetch(`/api/top_pooler?campus_id=${id}`, {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch top pooler.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching top pooler:", error);
      throw error;
    }
  };
  const {
    data: top_med_pooler,
    isError: isError_med,
    isLoading: isLoading_med,
  } = useQuery({
    queryKey: ["top_med_pooler"],
    queryFn: () => getTopPooler(55),
    retry: 4,
    refetchOnWindowFocus: false,
    enabled: !!session?.accessToken && !!session,
  });

  
  const {
    data: top_kh_pooler,
    isError: isError_kh,
    isLoading: isLoading_kh,
  } = useQuery({
    queryKey: ["top_kh_pooler"],
    queryFn: () => getTopPooler(16),
    retry: 4,
    refetchOnWindowFocus: false,
    enabled: !!session?.accessToken && !!session,
  });
  const {
    data: top_bg_pooler,
    isError: isError_bg,
    isLoading: isLoading_bg,
  } = useQuery({
    queryKey: ["top_bg_pooler"],
    queryFn: () => getTopPooler(21),
    retry: 4,
    refetchOnWindowFocus: false,
    enabled: !!session?.accessToken && !!session,
  });

  const addCampusName = (poolers: any[], campus: string): any[] => {
    return poolers.map((pooler) => ({
      ...pooler,
      campus_name: campus,
    }));
  };

  useEffect(() => {
    if (top_med_pooler && top_kh_pooler && top_bg_pooler) {
      const combinedPoolers = [
        ...addCampusName(top_kh_pooler, "khouribga"),
        ...addCampusName(top_med_pooler, "med"),
        ...addCampusName(top_bg_pooler, "benguerir"),
      ];
      combinedPoolers.sort((a, b) => b.level - a.level);
      const rankedPoolers = combinedPoolers.map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
      setTop3Poolers(rankedPoolers);
    }
  }, [top_med_pooler, top_kh_pooler]);

  return (
    <StyledTop3>
      <h1>2TH POOL</h1>
      <div className="Top3_container">
        {Top3Poolers[0]
          && Top3Poolers.map((Pooler: any) => {
              return (
                <PoolerItem
                  key={Pooler.id}
                  avatar={Pooler.user.image.versions.small}
                  rank={Pooler.rank}
                  login={Pooler.user.login}
                  level={Pooler.level}
                  campus={Pooler.campus_name}
                />
              );
            })
          }
      </div>
    </StyledTop3>
  );
};

export default Top3;
