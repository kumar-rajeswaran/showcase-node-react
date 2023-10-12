import { AppLoader, ValidateToken } from "components";
import Dashboard from "containers/dashboard";
import Products from "containers/products";
import SignIn from "containers/signIn";
import SignUp from "containers/signUp";
import Users from "containers/users";
import { AppMainLayout } from "layouts/app-main-layout";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { IStore } from "types";

interface IPrivateRouteProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: IStore) => state.auth.isLoggedIn);
  return isLoggedIn ? children : <Navigate to={"/signIn"} />;
};

export const AppRouter = () => {
  return (
    <>
      <AppLoader />
      <ValidateToken />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={"signIn"} />} />
          <Route path="signIn" element={<SignIn />} />
          <Route path="signUp" element={<SignUp />} />
          <Route
            path="me"
            element={
              <PrivateRoute>
                <AppMainLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to={"dashboard"} />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
