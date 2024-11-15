import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, clearUser } from "../context/user/userSlice";
import Coursel from "../components/coursel";


function Home() {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    if (!user) navigate("/login");
  });

  return (
    <div>
      <Coursel />
    </div>
  );
}

export default Home;
