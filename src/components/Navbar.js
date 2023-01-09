import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import styled from "styled-components";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleActive = (path) => {
    if (location.pathname === path) {
      return true;
    }
  };
  const iconActive = (path) => {
    return handleActive(path) ? "#000000" : "#b6b6b6";
  };

  return (
    <NavbarContain>
      <div className="navbar">
        <ul className="navbaritems">
          <li className="navbaritem" onClick={() => navigate("/")}>
            <ExploreIcon fill={iconActive("/")} width="32px" height="32px" />
            <p style={{ color: iconActive("/") }}>Explore</p>
          </li>
          <li className="navbaritem" onClick={() => navigate("/offers")}>
            <OfferIcon
              fill={iconActive("/offers")}
              width="32px"
              height="32px"
            />
            <p style={{ color: iconActive("/offers") }}>Offer</p>
          </li>
          <li className="navbaritem" onClick={() => navigate("/profile")}>
            <PersonOutlineIcon
              fill={iconActive("/profile")}
              width="32px"
              height="32px"
            />
            <p style={{ color: iconActive("/profile") }}>Profile</p>
          </li>
        </ul>
      </div>
    </NavbarContain>
  );
}

export default Navbar;

const NavbarContain = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
  z-index: 100;
  .navbar {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem 0;
    .navbaritems {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 500px;
      .navbaritem {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
      }
    }
  }
`;
