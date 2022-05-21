import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    text: "all products",
    path: "/",
    icon: <MdQueryStats />,
  },
  {
    id: 2,
    text: "add product",
    path: "add-product",
    icon: <FaWpforms />,
  },
  {
    id: 3,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 4,
    text: "My Cart",
    path: "add-to-cart",
    icon: <ImProfile />,
  },
];

export default links;
