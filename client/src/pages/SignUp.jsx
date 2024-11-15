import React, { useState, useTransition } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser, setToken, clearUser } from "../context/user/userSlice";
// import "./CustomSytle.css";
import "./custom.css"

function SignUp() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, token} = useSelector((state) => state.user);
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(form);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
        const createResult = await axios.post(
          "http://localhost:3000/user/",
          form
        );

        console.log(createResult);

        const loginResult = await axios.post("http://localhost:3000/user/login", {
          email: form.email,
          password: form.password,
        });
  
        dispatch(setUser(loginResult.data.user));
        dispatch(setToken(loginResult.data.token));
        localStorage.setItem("token", loginResult.data.token);
        localStorage.setItem("user", JSON.stringify(loginResult.data.user))
        navigate("/")
        
        console.log(loginResult.data.token);
        console.log(loginResult.data.user);

    } catch (err) {
      console.log(err.response.data.msg);
    }
  };

  return (
    <div className="contianer bg-grey-900 h-screen w-full ">
      <div className="internal__contianer flex items-center justify-center  border-2 h-screen">
        <div className="rightSide__container border ml-42 p-12 min-h-92 min-w-92 shadow-xl">
          <h1 className="text-2xl font-bold text-yellow-400">Sign Up</h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 mt-12 border-b-2 hover:border-yellow-400 transition-transform ease-in-out">
              <input
                onChange={handleChange}
                className="w-full py-2 pl-1 outline-0 "
                type="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-6 border-b-2 flex gap-2 hover:border-yellow-400">
              <input
                onChange={handleChange}
                className=" py-2 pl-1 outline-0"
                type="text"
                name="firstName"
                placeholder="First Name"
                required
              />
              <input
                onChange={handleChange}
                className=" py-2 pl-1 outline-0 no__outline"
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
              />
            </div>
            <div className="mb-6 border-b-2 hover:border-yellow-400">
              <input
                onChange={handleChange}
                className="w-full py-2 pl-1 outline-0"
                type="Number"
                name="phone"
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="mb-6 border-b-2 hover:border-yellow-400">
              <input
                onChange={handleChange}
                className="w-full py-2 pl-1 outline-0"
                type="text"
                name="username"
                placeholder="User Name"
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
              <button type="submit">Sign Up</button>
            </div>
          </form>

          <div className="flex justify-center gap-2">
            <p>You have already an account? </p>
            <Link to={"/login"}>
              <p className="text-yellow-400 hover:text-yellow-500">Login</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
