import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaBath, FaBed } from "react-icons/fa";

const listingItems = ({ listing, id, onDelete }) => {
  return (
    <CategoryListing>
      <Link
        to={`/category/${listing.type}/${id}`}
        className="categoryListingLink"
      >
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className="categoryListingImg"
        />
        <div className="categoryDetails">
          <p className="categoryListingLocation">{listing.location}</p>
          <p className="categoryListingName">{listing.name}</p>
          <p className="categoryListingPrice">
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " / Month" : ""}
          </p>
          <ul className="categoryListingInfo">
            <li>
              <FaBed />

              {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : 1}
            </li>
            <li>
              <FaBath />
              {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : 1}
            </li>
          </ul>
        </div>
      </Link>
      {onDelete && (
        <MdOutlineDeleteOutline
          className="deleteIcon"
          fill="rgb(231,76,60)"
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}
    </CategoryListing>
  );
};

export default listingItems;

const CategoryListing = styled.li`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  justify-content: center;
  .categoryListingLink {
    width: 100%;
    height: 100%;
    display: flex;
    .categoryListingImg {
      width: 140px;
      border-radius: 10px;
      object-fit: cover;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    }
    .categoryDetails {
      width: 100%;
      height: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .categoryListingLocation {
        font-size: 0.8rem;
        color: #999;
      }
      .categoryListingName {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 5px;
      }
      .categoryListingPrice {
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 5px;
        color: #00d463;
      }
      .categoryListingInfo {
        display: flex;
        justify-content: space-evenly;
        li {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
          svg {
            font-size: 1.2rem;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
`;
