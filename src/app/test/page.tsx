"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

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

const Page = () => {

  return (
    <StyledTest>
    </StyledTest>
  );
};

export default Page;

//https://api.intra.42.fr/v2/cursus_users/?&filter[campus_id]=21&filter[cursus_id]=21&filter[blackholed]=false&page[size]=100&page[number]=3