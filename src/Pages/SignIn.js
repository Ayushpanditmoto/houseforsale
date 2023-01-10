import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Input from "../components/Input";
import {
  BsFillShieldLockFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Oauth from "../components/Oauth";

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Credentials");
    }
  };
  return (
    <SignInContainer>
      <div className="header">
        <h1>Welcome Back!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          leading={<FaUserAlt />}
          type="email"
          name="email"
          placeholder="Enter Email"
          id="email"
          value={email}
          onChange={handleChange}
        />
        <Input
          leading={<BsFillShieldLockFill />}
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Enter Password"
          id="password"
          value={password}
          onChange={handleChange}
          onClick={handleShowPassword}
          icons={showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        />
        <div className="forgot">
          <Link to="/forgotpassword">Forgot Password?</Link>
        </div>
        <div className="signinbar">
          <p className="signintext">Sign in</p>
          <button className="signinbutton">
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </form>
      <Oauth />
      <Link to="/signup" className="register">
        Sign Up Instead
      </Link>
    </SignInContainer>
  );
}

export default SignIn;

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  justify-content: center;
  .header {
    width: 100%;
    text-align: center;
    margin: 1rem 0;
    h1 {
      font-size: 2rem;
      font-weight: 800;
    }
  }
  .register {
    text-decoration: none;
    color: #00c98c;
    font-weight: 600;
    margin: 1rem 0;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .signinbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;

    .signintext {
      font-size: 1.5rem;
      font-weight: 900;
      margin-right: 1rem;
    }
    .signinbutton {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: #00c98c;
      font-size: 2.5rem;
    }
    .signinbutton:hover {
      color: #00714f;
    }
  }
  .forgot {
    margin: 1rem 0;
    text-align: right;
    a {
      color: #00c98c;
      font-weight: 500;
      text-decoration: none;
    }
  }
`;
