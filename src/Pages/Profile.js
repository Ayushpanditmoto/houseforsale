import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

function Profile() {
  const [user, setUser] = useState({});
  const auth = getAuth();
  useEffect(() => {
    console.log(auth.currentUser);
    setUser(auth.currentUser);
  }, []);

  return user ? (
    <div>
      <h1>{user.displayName}</h1>
      <h1>{user.email}</h1>
    </div>
  ) : (
    <div>Not Logged In</div>
  );
}

export default Profile;
