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
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import { setUser, setToken, clearUser } from "./context/user/userSlice";
import Banner from "./components/Banner/Banner";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./pages/Hero";
import Services from "./pages/Services";
import TopBooks from "./pages/Books";
import AppStore from "./pages/AppStore";
import Testimonial from "./pages/Testimonial";
import OrderPopup from "./components/OrderPopup";
// import DashboardLayout from "./dashboard/DashboardLayout";
import UploadBook from "./dashboard/books/new";
import Books from "./dashboard/books/list";
import UsersList from "./dashboard/users/usersList";
import AdminsList from "./dashboard/users/adminsList";
import Order from "./dashboard/orders/list";
import Transactions from "./dashboard/transactions/list";
// import Dashboard from "./dashboard/dashboard";
import DashboardLayout from "./dashboard/DashboardLayout";
import Analytics from "./dashboard/Analytics";
import NotFound from "./not-found";
import TestPage from "./dashboard/TestPage";

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
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* <Header /> */}
        <Routes>
          <Route pa></Route>

          <Route
            path="/"
            element={
              <>
                {" "}
                <Navbar handleOrderPopup={handleOrderPopup} />
                <Hero /> <Services handleOrderPopup={handleOrderPopup} />{" "}
                <TopBooks /> <Testimonial />{" "}
                <OrderPopup
                  orderPopup={orderPopup}
                  setOrderPopup={setOrderPopup}
                />
              </>
            }
          />
          {/* <Route path="/admin/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Dashboard />} />
            <Route path="upload" element={<UploadBook />} />
            <Route path="manage" element={<ManageBook />} />
            <Route path="users" element={<UsersList />} />
            <Route path="order" element={<Order />} />
          </Route> */}

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="" element={<Analytics />} />
            <Route path="orders" element={<Order />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="upload" element={<UploadBook />} />
            <Route path="books" element={<Books />} />
            <Route path="books/new" element={<Books />} />
            <Route path="users" element={<UsersList />} />
            <Route path="admins" element={<AdminsList />} />
          </Route>

          <Route>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
