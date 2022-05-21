import Landing from "./pages/Landing";
import Error from "./pages/Error";
import Register from "./pages/Register";
import {
  AddProduct,
  AllProducts,
  Profile,
  SharedLayout,
  Cart,
} from "./dashboard/index";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import ProtectedRouter from "./components/ProtectedRoute";
import ProtectedFarmerRoute from "./components/ProtectedFarmerRoute";
import ProtectedCustomerRoute from "./components/ProtectedCustomerRoute";

function App() {
  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouter>
                  <SharedLayout />
                </ProtectedRouter>
              }
            >
              <Route index element={<AllProducts />} />
              <Route
                path="add-product"
                element={
                  <ProtectedFarmerRoute>
                    <AddProduct />
                  </ProtectedFarmerRoute>
                }
              />
              <Route path="profile" element={<Profile />} />
              <Route
                path="add-to-cart"
                element={
                  <ProtectedCustomerRoute>
                    <Cart />
                  </ProtectedCustomerRoute>
                }
              />
            </Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/landing" element={<Landing />}></Route>
            <Route path="*" element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
