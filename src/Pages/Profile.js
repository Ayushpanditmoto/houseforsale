import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import styled from "styled-components";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  // const { name, email } = formData;

  const handleLogout = () => {
    auth.signOut();
    navigate("/signin");
  };

  return (
    <ProfileContain>
      <div className="profileheader">
        <h1>My Profile</h1>
        <button type="button" className="logout" onClick={handleLogout}>
          Logout
        </button>
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
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
`;
