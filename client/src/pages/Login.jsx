import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, clearUser } from "../context/user/userSlice";

function Login() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginResult = await axios.post("http://localhost:3000/user/login", {
        email: form.email,
        password: form.password,
      });

      dispatch(setUser(loginResult.data.user));
      dispatch(setToken(loginResult.data.token));
      localStorage.setItem("token", loginResult.data.token);
      localStorage.setItem("user", JSON.stringify(loginResult.data.user))
      navigate("/");

      console.log(loginResult.data.token);
      console.log(loginResult.data.user);
    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  const handleLogOut = () => {
    dispatch(clearUser());
  };

  return (
    <div className="contianer bg-grey-900 h-screen w-full ">
      <div className="internal__contianer flex items-center justify-center  border-2 h-screen">
        <div className="rightSide__container border ml-42 p-12 min-h-92 min-w-92 shadow-xl">
          <h1 className="text-2xl font-bold text-yellow-400">Login</h1>

          {/* Form  */}
          <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-12 border-b-2 border-grey-900 hover:border-yellow-400">
              <input
                onChange={handleChange}
                className="w-full py-2 pl-1 outline-0"
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="mb-12 border-b-2 hover:border-yellow-400">
              <input
                onChange={handleChange}
                className="w-full py-2 pl-1 outline-0"
                type="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex item-center justify-center bg-yellow-400 mb-4 p-1 hover:bg-yellow-500">
              <button className="" type="submit">
                Login
              </button>
            </div>
          </form>
          <div className="flex justify-between gap-2">
            <p>You haven't account yet? </p>
            <Link to={"/signup"}>
              <p className="text-yellow-400 hover:text-yellow-500">Sign Up</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
