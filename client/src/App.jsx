import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import OrderPopup from "./components/OrderPopup";
import Analytics from "./dashboard/Analytics";
import DashboardLayout from "./dashboard/DashboardLayout";
import TestPage from "./dashboard/TestPage";
import BookEditPage from "./dashboard/books/BookEditPage";
import {
  default as NewBookPage,
  default as UploadBook,
} from "./dashboard/books/NewBookPage";
import Books from "./dashboard/books/list";
import Order from "./dashboard/orders/list";
import OrderDetailPage from "./dashboard/orders/OrderDetailPage";
import Transactions from "./dashboard/transactions/list";
import AdminsList from "./dashboard/users/adminsList";
import AddAdminsPage from "./dashboard/users/AddAdminsPage";
import UsersList from "./dashboard/users/usersList";
import UserDetailsPage from "./dashboard/users/UserDetailPage";
import NotFound from "./not-found";
import TopBooks from "./pages/Books";
import Hero from "./pages/Hero";
import Services from "./pages/Services";
import Testimonial from "./pages/Testimonial";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

function App() {
  // const { user, token } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // const checkLoggedIn = async () => {
  //   let token = localStorage.getItem("token");
  //   if (token === null) {
  //     localStorage.setItem("token", "");
  //     token = "";
  //   } else {
  //   }
  // };

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

  // //Logout
  // const logout = () => {
  //   dispatch(clearUser());
  //   localStorage.setItem("token", "");
  //   localStorage.setItem("user", "");
  // };

  // useEffect(() => {
  //   checkLoggedIn();
  // }, []);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        {/* <Header /> */}
        <Routes>
          <Route></Route>

          <Route
            path="/"
            element={
              <>
                {" "}
                <Navbar handleOrderPopup />
                <Hero /> <Services handleOrderPopup /> <TopBooks />{" "}
                <Testimonial />{" "}
                <OrderPopup
                // orderPopup={orderPopup}
                // setOrderPopup={setOrderPopup}
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
            <Route path="orders/:id" element={<OrderDetailPage />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="transactions/:id" element={<BookEditPage />} />
            <Route path="upload" element={<UploadBook />} />
            <Route path="books" element={<Books />} />
            <Route path="books/:id" element={<BookEditPage />} />
            <Route path="books/new" element={<NewBookPage />} />
            <Route path="users" element={<UsersList />} />
            <Route path="users/:id" element={<UserDetailsPage />} />
            <Route path="admins" element={<AdminsList />} />
            <Route path="admins/new" element={<AddAdminsPage />} />
            <Route path="admins/:id" element={<BookEditPage />} />
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
