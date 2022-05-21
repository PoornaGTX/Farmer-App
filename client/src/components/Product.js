import React from "react";
import moment from "moment";
import {
  FaLocationArrow,
  FaBriefcase,
  FaCalendarAlt,
  FaBarcode,
} from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsCart4 } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import Wrapper from "../assets/wrappers/Job";
import ProductInfo from "./ProductInfo";

const Product = ({ name, createdAt, price, qty, _id }) => {
  const { setEditProduct, deleteProduct, user, addItemToCart } =
    useAppContext();
  let date = moment(createdAt);
  date = date.format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header></header>
      <div className="content">
        {/* content center later */}
        <div className="content-center">
          <ProductInfo icon={<FaLocationArrow />} text={name} />
          <ProductInfo icon={<RiMoneyDollarCircleFill />} text={price} />
          <ProductInfo icon={<BsCart4 />} text={qty} />
        </div>
        <footer>
          {user.type !== "Customer" && (
            <div className="actions">
              <Link
                to="/add-product"
                onClick={() => setEditProduct(_id)}
                className="btn edit-btn"
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn delete-btn"
                onClick={() => deleteProduct(_id)}
              >
                Delete
              </button>
            </div>
          )}
          {user.type === "Customer" && (
            <div className="actions">
              <Link
                to={`/add-to-cart`}
                onClick={() => addItemToCart({ name, price, qty, _id })}
                className="btn edit-btn"
              >
                Add to cart
              </Link>
            </div>
          )}
        </footer>
      </div>
    </Wrapper>
  );
};

export default Product;
