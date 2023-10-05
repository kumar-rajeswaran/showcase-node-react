import { useCallback, useEffect, useRef } from "react";
import { NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { doLogout } from "../../reducers";
import { IStore } from "../../types";

interface AppNavBarProps {
  setHeaderHeight: (arg0: string) => void;
}

export const AppNavBar = (props: AppNavBarProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const onheaderResize = useCallback(() => {
    const headerHeight = headerRef?.current;
    if (headerHeight) {
      props.setHeaderHeight(`${headerHeight?.clientHeight + 20}px`);
    }
  }, [props]);
  useEffect(() => {
    window.addEventListener("resize", onheaderResize);
    onheaderResize();
    return () => {
      removeEventListener("resize", onheaderResize);
    };
  });
  const authData = useSelector((state: IStore) => state.auth.user);
  const isLoggedIn = useSelector((state: IStore) => state.auth.isLoggedin);
  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  });
  const userTitle = (
    <span>
      <i className="bi bi-person-circle"></i>
      {authData.firstName}
    </span>
  );
  return (
    <header className="py-3 mb-3 border-bottom shadow" ref={headerRef}>
      <div className="container-fluid align-items-center d-flex">
        <div className="flex-shrink-1">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none">
            <i className="bi bi-coin fs-2 text-dark"></i>
            <span className="mx-2">ShowCase-UI</span>
          </a>
        </div>
        <div className="flex-grow-1 "></div>
        <div className="d-flex align-items-center">
          <NavDropdown title={userTitle} menuVariant="light">
            <Link to="/dashboard/users" className="dropdown-item">
              Users
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => dispatch(doLogout())}>
              <i className="bi bi-box-arrow-left"></i> Logout
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
