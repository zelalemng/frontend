import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineDollar, AiOutlinePicRight } from 'react-icons/ai';
import { FaUser } from "react-icons/fa";
import { FiBox, FiLogOut, FiPocket } from 'react-icons/fi';
const menu = [
  {
    title: "Dashboard",
    icon: <AiOutlineHome />,
    path: "/dashboard",
  },
  {
    title: "Category",
    icon: <FiBox />,
    path: "/CategoryManagement",
    childrens: [
      {
        title: "Category",
        path: "/CategoryManagement",
        icon: <AiOutlinePicRight />,
      },
      {
        title: "Service",
        path: "/service",
        icon: <FiPocket />,
      },
      {
        title: "Payments",
        path: "/pay",
        icon: <AiOutlineDollar  />,
      }
    ]
  },
  {
    title: "Order",
    icon: <AiOutlineShoppingCart />,
    path: "/OrderManagement",
  },
  {
    title: "Customers",
    icon: <FaUser />,
    path: "/details"
  },
  {
    title: "Logout",
    icon: <FiLogOut />,
    path: "/",
  },
];

export default menu;
