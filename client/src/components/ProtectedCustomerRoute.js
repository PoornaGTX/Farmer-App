import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedCustomerRoute = ({ children }) => {
  const { user } = useAppContext();
  console.log(user.type);
  if (user.type === "Farmer") {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedCustomerRoute;
