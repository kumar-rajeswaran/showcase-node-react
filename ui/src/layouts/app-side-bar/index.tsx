import { Link } from "react-router-dom";

export const AppSideBar = () => {
  return (
    <aside className="col-md-2 col-sm-2 flex-grow-sm-1 flex-shrink-1 flex-grow-0 sticky-top pb-sm-0 pb-3 mb-3">
      <div className="bg-light border rounded-3 p-1 h-100 sticky-top">
        <ul className="nav nav-pills flex-sm-column flex-row mb-auto justify-content-between text-truncate">
          <li className="nav-item">
            <Link to="/me/users" className="nav-link px-2 text-truncate">
              <i className="bi bi-house fs-5 px-1"></i>
              <span className="d-none d-sm-inline">Users</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/me/products" className="nav-link px-2 text-truncate">
              <i className="bi bi-house fs-5 px-1"></i>
              <span className="d-none d-sm-inline">Products</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};
