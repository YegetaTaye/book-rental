import React from "react";
// import Logo from "../../assets/website/logo.png";
import Logo from "../../assets/images/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "./DarkMode";
import { FaCaretDown } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import useStore from "@/store";

const menu = [
  // {
  //   id: 1,
  //   name: "Home",
  //   link: "/#",
  // },
  {
    id: 2,
    name: "Best Seller",
    link: "/#services",
  },
];

const DropdownLinks = [
  {
    name: "Trending Books",
    link: "/#",
  },
  {
    name: "Best Sellingff",
    link: "/#",
  },
  {
    name: "Authors",
    link: "/#",
  },
];

const Navbar = () => {
  const cart = useStore((s) => s.cart);

  return (
    <>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 pl-4 md:pr-8 border-b">
        <div className="container py-3 sm:py-0">
          <div className="flex justify-between items-center">
            <div>
              <Link
                to={"/"}
                className="font-bold text-xl sm:text-3xl flex gap-2 "
              >
                <img src={Logo} alt="Logo" className="w-10" />
                Arsema
              </Link>
            </div>
            <div className="flex justify-between items-center gap-4">
              {/* <div>
                <DarkMode />
              </div> */}
              <ul className="hidden sm:flex items-center gap-4">
                {menu.map((menu) => (
                  <li key={menu.id}>
                    <a
                      href={menu.link}
                      className="inline-block py-4 px-4 hover:text-primary duration-200"
                    >
                      {menu.name}
                    </a>
                  </li>
                ))}
                {/* Simple Dropdown and Links */}
                <li className="group relative cursor-pointer">
                  <a
                    href="/#home"
                    className="flex h-[72px] items-center gap-[2px]"
                  >
                    Quick Links{" "}
                    <span>
                      <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                    </span>
                  </a>
                  <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="flex items-center gap-4">
                <Link to="/order">
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-purple-600 text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">
                      {cart.length > 0 ? cart.length : 0}
                    </span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Roberto Karlos
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
