import { useDispatch, useSelector } from "react-redux";
import { IStore, IUser } from "../../types";
import DataTable, { TableColumn } from "react-data-table-component";
import { useEffect } from "react";
import { loadUsers } from "reducers";
const columnDefs: TableColumn<IUser>[] = [
  {
    selector: (it) => it.firstName,
    name: "FirstName",
    sortable: true,
  },
  {
    selector: (it) => it.lastName,
    name: "LastName",
    sortable: true,
  },
  {
    selector: (it) => it.email,
    name: "Email",
    sortable: true,
  },
];
export default function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state: IStore) => state.users.user);
  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);
  return (
    <div className="overflow-auto h-100 scrollbar">
      <DataTable
        title="Users"
        columns={columnDefs}
        data={users}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="calc(100vh - 265px)"
        selectableRows
      />
    </div>
  );
}
