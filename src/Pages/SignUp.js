import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  AiOutlineEye,
  AiFillIdcard,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import Input from "../components/Input";
import {
  BsFillShieldLockFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../firebase.config";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { name, email, password } = formData;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      await updateProfile(auth.currentUser, {
        displayName: name,
      });
      const formDatacopy = { ...formData };
      delete formDatacopy.password;
      formDatacopy.createdAt = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDatacopy);
      navigate("/");

      // await db.collection("users").doc(user.uid).set({
      //   name,
      //   email,
      //   password,
      // });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong with Registration");
    }
  };

  return (
    <SignUpContainer>
      <div className="header">
        <h1>Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Input
          leading={<AiFillIdcard />}
          type="text"
          name="name"
          placeholder="Enter Name"
          id="name"
          onChange={handleChange}
          value={name}
        />
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
        <div className="signUpbar">
          <p className="signUptext">Sign Up</p>
          <button className="signUpbutton">
            <BsFillArrowRightCircleFill />
          </button>
        </div>
      </form>
      {/* google outh */}
      <Link to="/signin" className="register">
        Sign In Instead
      </Link>
    </SignUpContainer>
  );
}

export default SignUp;

const SignUpContainer = styled.div`
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
  .signUpbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem;

    .signUptext {
      font-size: 1.5rem;
      font-weight: 900;
      margin-right: 1rem;
    }
    .signUpbutton {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: #00c98c;
      font-size: 2.5rem;
    }
    .signUpbutton:hover {
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
