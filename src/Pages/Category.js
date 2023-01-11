import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase.config";
import styled from "styled-components";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";

const Category = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      setLoading(true);
      try {
        const listingsRef = collection(db, "listings");
        const q = query(
          listingsRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(q);
        let listings = [];

        querySnapshot.forEach((doc) => {
          return listings.push({ ...doc.data(), id: doc.id });
        });
        setListings(listings);
        console.log(listings);

        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log(err.message);
        toast.error("Could not fetch Listings");
      }
    };
    getListings();
  }, [params.categoryName]);

  return (
    <CategoryContainer>
      <header>
        <p className="pageHeader">
          {params.categoryName === "rent"
            ? "Places for rent"
            : "Places for sale"}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <div className="listings">
          {listings.map((listing) => (
            <main>
              <ul className="categoryListings">
                <li>
                  <img src={listing.imageUrls[0]} alt="listing" />
                </li>

                <li>
                  <p className="listingTitle">{listing.title}</p>
                </li>
              </ul>
            </main>
          ))}
        </div>
      ) : (
        <div className="noListings">
          <p>No listings found</p>
        </div>
      )}
    </CategoryContainer>
  );
};

export default Category;

const CategoryContainer = styled.div``;
