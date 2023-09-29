import { AppLoader, VaalidateToken } from "components";
import Dashboard from "containers/dashboard";
import Products from "containers/products";
import Signin from "containers/signin";
import Signup from "containers/signup";
import Users from "containers/users";
import { AppMainLayout } from "layouts/app-main-layout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export const AppRouter = () => {
  return (
    <>
      <AppLoader />
      <VaalidateToken />
      <BrowserRouter>
        <Routes>
          <Route index element={<Navigate to={"signin"} />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          <Route path="me" element={<AppMainLayout />}>
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
