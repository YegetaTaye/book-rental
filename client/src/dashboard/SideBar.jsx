"use client";
// import logo from "../../assets/images/logo.png";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { GiCardExchange } from "react-icons/gi";

export default function SideBar() {
  return (
    <Sidebar aria-label="Sidebar with logo branding example">
      <Sidebar.Logo href="#" imgAlt="Website logo">
        Admin
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/admin/dashboard/" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/order" icon={HiViewBoards}>
            Orders
          </Sidebar.Item>
          <Sidebar.Item
            href="/admin/dashboard/transaction"
            icon={GiCardExchange}
          >
            Transaction
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/upload" icon={HiInbox}>
            Upload Books
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/manage" icon={HiShoppingBag}>
            Manage Books
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/users" icon={HiUser}>
            Users
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}>
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiTable}>
            Sign Up
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
