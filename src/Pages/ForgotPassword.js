import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import styled from "styled-components";
import Input from "../components/Input";
import { FaUserAlt } from "react-icons/fa";

function ForgotPassword() {
  const [Email, setEmail] = useState("");
  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, Email);
      toast.success("Check your email for password reset link");
    } catch (error) {
      toast.error("Invalid Email");
    }
  };

  return (
    <ForgotPasswordContainer>
      <div className="forgotTitle">
        <h1>Forgot Password</h1>
      </div>
      <form onSubmit={onSubmit}>
        <Input
          leading={<FaUserAlt />}
          type="email"
          name="email"
          value={Email}
          placeholder="Enter the Email"
          onChange={onChange}
        />
        <div className="signinLink">
          <Link to="/signin">Sign In</Link>
        </div>
        <button type="submit">Sent Reset Link</button>
      </form>
    </ForgotPasswordContainer>
  );
}

export default ForgotPassword;

const ForgotPasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem 0.5rem;
  .forgotTitle {
    margin: 0.5rem 0;
    h1 {
      font-size: 2rem;
      font-weight: 800;
      color: #000000;
    }
  }
  .signinLink {
    width: 100%;
    text-align: right;
    a {
      color: #00ba8f;
    }
  }
  button {
    width: 100%;
    margin: 1rem 0;
    outline: none;
    border: none;
    background-color: #00ba8f;
    color: #ffffff;
    padding: 0.5rem 0;
    font-size: 1rem;
    font-weight: 700;
  }
`;
