import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";

function Explore() {
  return (
    <ExploreContainer>
      <div className="title">
        <h1>Explore</h1>
      </div>
      {/* slider */}
      <div className="categories">
        <p className="explorecategoryHeading">Categories</p>
        <div className="container">
          <div className="category">
            <Link to="/category/rent">
              <img src={rentCategoryImage} alt="rent" />
              <h2>Places for rent</h2>
            </Link>
          </div>
          <div className="category">
            <Link to="/category/sale">
              <img src={sellCategoryImage} alt="sell" />
              <h2>Places for sell</h2>
            </Link>
          </div>
        </div>
      </div>
    </ExploreContainer>
  );
}

export default Explore;

const ExploreContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  .title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }
  }
  .categories {
    margin-top: 2rem;
    .explorecategoryHeading {
      font-size: 1.5rem;
      font-weight: 600;
    }
    .container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
      .category {
        flex: 1;
        margin-right: 0.5rem;
        img {
          width: 100%;
          max-width: 300px;
          height: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
          box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        }
        h2 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-top: 0.5rem;
        }
      }
    }
  }
`;
