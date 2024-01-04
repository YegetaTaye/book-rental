import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { setUser, setToken, clearUser } from "./context/user/userSlice";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./pages/Hero";
import Services from "./pages/Services";
import Books from "./pages/Books";
import AppStore from "./pages/AppStore";
import Testimonial from "./pages/Testimonial";
import OrderPopup from "./components/OrderPopup";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import UploadBook from "./pages/dashboard/UploadBook";
import ManageBook from "./pages/dashboard/ManageBook";
import UsersList from "./pages/dashboard/UsersList";
import Order from "./pages/dashboard/order";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
  const { user, token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  //
  const checkLoggedIn = async () => {
    let token = localStorage.getItem("token");
    if (token === null) {
      localStorage.setItem("token", "");
      token = "";
    } else {
    }
  };

  //Order pop-up
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  //AOS
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  //Logout
  const logout = () => {
    dispatch(clearUser());
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <Router>
      {/* <Header /> */}
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <>
              {" "}
              <Hero /> <Services handleOrderPopup={handleOrderPopup} />{" "}
              <Banner /> <AppStore /> <Books /> <Testimonial />{" "}
              <OrderPopup
                orderPopup={orderPopup}
                setOrderPopup={setOrderPopup}
              />
            </>
          }
        />
        <Route path="/admin/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Dashboard />} />
          <Route path="upload" element={<UploadBook />} />
          <Route path="manage" element={<ManageBook />} />
          <Route path="users" element={<UsersList />} />
          <Route path="order" element={<Order />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
