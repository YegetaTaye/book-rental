import React, { useState } from "react";
import Img1 from "../assets/books/book2.jpg";
import Img2 from "../assets/books/book1.jpg";
import Img3 from "../assets/books/book3.jpg";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { setCart, clearCart } from "../context/cart/cartSlice";
import { useDispatch } from "react-redux";

const ServicesData = [
  {
    id: 1,
    img: Img1,
    title: "His Life",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    img: Img2,
    title: "Who's there",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    img: Img3,
    title: "Lost Boy",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    img: Img3,
    title: "Lost Boy",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 5,
    img: Img3,
    title: "Lost Boy",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 6,
    img: Img3,
    title: "Lost Boy",
    description:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const Services = ({ handleOrderPopup }) => {
  const checkUser = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  const [cart, setCart] = useState([]);
  // console.log(cart)

  const handleCart = (newItem) => {
    console.log(newItem);
    setCart((prevCart) => [...prevCart, newItem]);
  };
  console.log(cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // dispatch(setCart(cart))
  return (
    <>
      <span id="services"></span>
      <div className="py-10 px-10  border-r-gray-50 dark:bg-gray-900 dark:text-white duration-200">
        <div className="container">
          <div className="text-center mb-20 max-w-[400px] mx-auto">
            <p className="text bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
              Trending Books
            </p>
            <h1 className="text-3xl font-bold py-2">Best Books</h1>
            <p className="text text-gray-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis delectus architecto error nesciunt,
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
            {ServicesData.map((service) => (
              <div
                key={service.id}
                data-aos="zoom-in"
                className=" rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px] mt-16 mb-16"
              >
                <div className="h-[100px]">
                  <img
                    src={service.img}
                    alt=""
                    className="max-w-[100px] block mx-auto transform -translate-y-14
                  group-hover:scale-105  duration-300 shadow-md"
                  />
                </div>
                <div className="p-4 text-center">
                  <div className="w-full flex items-center justify-center gap-1"></div>
                  <h1 className="text-xl font-bold">{service.title}</h1>
                  <p className="text-gray-500 group-hover:text-white duration-high text-sm line-clamp-2">
                    {service.description}
                  </p>
                  <button
                    className="bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                    // onClick={navigate("/login")}
                    // onClick={checkUser ? ()=>{handleCart(service)} : handleOrderPopup}
                    onClick={
                      checkUser
                        ? () => {
                            handleCart(service);
                          }
                        : handleOrderPopup
                    }
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
