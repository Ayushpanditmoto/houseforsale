import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineDeleteOutline } from "react-icons/md";

const listingItems = ({ listing, id }) => {
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
        <h2>{listing.name}</h2>
        <MdOutlineDeleteOutline />
      </Link>
    </CategoryListing>
  );
};

export default listingItems;

const CategoryListing = styled.li``;
