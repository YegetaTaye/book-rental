import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Analytics from "./dashboard/Analytics";
import DashboardLayout from "./dashboard/DashboardLayout";
import TestPage from "./dashboard/TestPage";
import BookEditPage from "./dashboard/books/BookEditPage";
import {
  default as NewBookPage,
  default as UploadBook,
} from "./dashboard/books/NewBookPage";
import Books from "./dashboard/books/list";
import OrderDetailPage from "./dashboard/orders/OrderDetailPage";
import Order from "./dashboard/orders/list";
import TransactionListPage from "./dashboard/transactions/TransactionListPage";
import Transactions from "./dashboard/transactions/list";
import AddAdminsPage from "./dashboard/users/AddAdminsPage";
import UserDetailsPage from "./dashboard/users/UserDetailPage";
import AdminsList from "./dashboard/users/adminsList";
import UsersList from "./dashboard/users/usersList";
import NotFound from "./not-found";
import BookDetailsPage from "./pages/BookDetialPage";
import BooksList from "./pages/BooksList";
import TopBooks from "./pages/FeaturedBooks";
import Footer from "./pages/Footer";
import Hero from "./pages/Hero";
import OrderPage from "./pages/OrderPage";
import Services from "./pages/Services";
import Testimonial from "./pages/Testimonial";
import LoginPage from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";

function App() {
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

  // return (
  //     <>
  //       <Router>
  //         <Routes>
  //           <Route path="/test" element={<TestPage />} />
  //           <Route path="/login" element={<LoginPage />} />
  //           <Route path="/signup" element={<SignUp />} />
  //         </Routes>
  //         {/* <Header /> */}
  //         <Routes>
  //           <Route
  //             path="/"
  //             element={
  //               <>
  //                 {" "}
  //                 <Navbar />
  //                 <Hero /> <Services /> <TopBooks /> <Testimonial /> <Footer />{" "}
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/books"
  //             element={
  //               <>
  //                 {" "}
  //                 <Navbar />
  //                 <BooksList />
  //               </>
  //             }
  //           />
  //           <Route
  //             path="/books/:id"
  //             element={
  //               <>
  //                 {" "}
  //                 <Navbar />
  //                 <BookDetailsPage />
  //               </>
  //             }
  //           />

  //           <Route path="/dashboard" element={<DashboardLayout />}>
  //             <Route path="" element={<Analytics />} />
  //             <Route path="orders" element={<Order />} />
  //             <Route path="orders/:id" element={<OrderDetailPage />} />
  //             <Route path="transactions" element={<Transactions />} />
  //             <Route path="transactions/:id" element={<TransactionListPage />} />
  //             <Route path="upload" element={<UploadBook />} />
  //             <Route path="books" element={<Books />} />
  //             <Route path="books/:id" element={<BookEditPage />} />
  //             <Route path="books/new" element={<NewBookPage />} />
  //             <Route path="users" element={<UsersList />} />
  //             <Route path="users/:id" element={<UserDetailsPage />} />
  //             <Route path="admins" element={<AdminsList />} />
  //             <Route path="admins/new" element={<AddAdminsPage />} />
  //             <Route path="admins/:id" element={<BookEditPage />} />
  //           </Route>

  //           <Route>
  //             <Route path="/*" element={<NotFound />} />
  //           </Route>
  //         </Routes>
  //       </Router>
  //     </>
  //   );
  // }

  const MainLayout = () => (
    <>
      <Navbar />
      <Outlet /> {/* Render nested routes here */}
      <Footer />
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Public routes without Navbar/Footer */}
        <Route path="/test" element={<TestPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout />}>
          <Route
            path="/"
            element={
              <>
                <Hero /> <Services /> <TopBooks /> <Testimonial />
              </>
            }
          />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetailsPage />} />
          <Route path="/order" element={<OrderPage />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="" element={<Analytics />} />
          <Route path="orders" element={<Order />} />
          <Route path="orders/:id" element={<OrderDetailPage />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transactions/:id" element={<TransactionListPage />} />
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

        {/* Catch-all route for 404 */}
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
