"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

// import { create_user } from "../../../actions/user_action";

const StyledTest = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
`;

const page = () => {
  // create user
  // const { data: session } = useSession();

  // hit post request to create user /api/students/create
  // const fetchData = async () => {
  //   if (session) {
  //     try {
  //       //
  //       const res = await fetch(
  //         "https://api.intra.42.fr/v2/users/ostouayr",
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${session?.accessToken}`,
  //           },
  //         }
  //       );
  //       const data = await res.json();
  //       console.log(data);
  //     } catch (error) {
  //       toast.error("Error creating user");
  //     }
  //   } else {
  //     toast.error("Please login first");
  //   }
  // };

  return (
    <StyledTest>
      {/* <button onClick={fetchData}>Create Me</button>  */}
    </StyledTest>
  );
};

export default page;
