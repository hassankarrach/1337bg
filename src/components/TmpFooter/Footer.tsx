import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FaInstagramSquare, FaGithubSquare } from "react-icons/fa";

const StyledFooter = styled.div`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  a {
    color: white;
    opacity: 0.6;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    &:hover {
      opacity: 1;
    }
  }
  span {
    font-family: var(--main_font);
    font-size: 1.2rem;
	font-weight : 200;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <span>@Zero</span>
      <a href="https://github.com/hassankarrach" target="_blank">
        <FaGithubSquare size={20} className="Icon" />
      </a>
      <a href="https://www.instagram.com/7sn.jsx/" target="_blank">
        <FaInstagramSquare size={20} className="Icon" />
      </a>
    </StyledFooter>
  );
};

export default Footer;
