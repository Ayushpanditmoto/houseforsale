import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import styled from "styled-components";
import googleIcon from "../assets/svg/googleIcon.svg";

const Oauth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (!docSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName,
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }
      toast.success("Login Successful");
      navigate(location.state?.from || "/");
    } catch (error) {
      toast.error("Could not Authorised with Google");
    }
  };

  return (
    <SocialLogin>
      <p>Sign {location.pathname === "/signup" ? "Up" : "In"} With</p>
      <button className="btnempty" onClick={handleGoogleLogin}>
        <img className="google" src={googleIcon} alt="google" />
      </button>
    </SocialLogin>
  );
};

export default Oauth;

const SocialLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .btnempty {
    background-color: white;
    margin: 0.5rem 0;
    border-radius: 50%;
    box-sizing: content-box;
    padding: 1rem;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
  .google {
    width: 40px;
    height: 40px;
  }
`;
