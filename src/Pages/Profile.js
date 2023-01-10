import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import styled from "styled-components";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import Input from "../components/Input";
import { toast } from "react-toastify";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const handleLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  const onSubmit = async () => {
    try {
      if (name !== auth.currentUser.displayName) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
      }
      const userRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(userRef, {
        name,
      });
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <ProfileContain>
      <div className="profileheader">
        <h1>My Profile</h1>
        <button type="button" className="logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="profile_details_header">
        <p className="profile_details_text">Personal Details</p>
        <p
          className="change_personal_details"
          onClick={() => {
            changeDetails && onSubmit();
            setChangeDetails(!changeDetails);
          }}
        >
          {changeDetails ? "done" : "change"}
        </p>
      </div>
      <div className="profileCard">
        <form>
          <Input
            label="Name"
            name="name"
            value={name}
            onChange={handleChange}
            disabled={!changeDetails}
          />
          <Input
            label="Email"
            name="email"
            value={email}
            onChange={handleChange}
            disabled="disabled"
          />
        </form>
      </div>
    </ProfileContain>
  );
}

export default Profile;

const ProfileContain = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .profileheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 1rem 0;
    h1 {
      font-size: 2rem;
      font-weight: 800;
    }
    .logout {
      background: transparent;
      border: none;
      outline: none;
      background-color: #00c677;
      padding: 0.5rem 1rem;
      color: #fff;
      font-size: 1rem;
      font-weight: 800;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
  .profile_details_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 1rem 0;
    .profile_details_text {
      font-size: 1.2rem;
      font-weight: 800;
    }
    .change_personal_details {
      font-size: 1rem;
      font-weight: 800;
      cursor: pointer;
      color: #00c677;
    }
  }
  .profileCard {
    width: 100%;
  }
`;
