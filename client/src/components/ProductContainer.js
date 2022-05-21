import React, { useEffect } from "react";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useAppContext } from "../context/appContext";
import Product from "./Product";
import Loading from "./Loading";

const ProductContainer = () => {
  const { getAllProducts, products, totalProducts, page, isLoading } =
    useAppContext();
  useEffect(() => {
    getAllProducts();
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  if (products.length === 0) {
    return (
      <Wrapper>
        <h2>No Products to display....</h2>
      </Wrapper>
    );
  }
  //set method get all products for customers

  return (
    <Wrapper>
      <h5>
        {totalProducts} product{products.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {products.map((product) => {
          return <Product key={product._id} {...product} />;
        })}
      </div>
    </Wrapper>
  );
};

export default ProductContainer;
