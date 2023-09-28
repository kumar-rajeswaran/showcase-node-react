import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doValidateToken } from "reducers";
import { SetAuthorizationHeader } from "services/api";
import { IStore } from "types";

export const VaalidateToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IStore) => state.auth.token);
  const isLoggedin = useSelector((state: IStore) => state.auth.isLoggedin);
  useEffect(() => {
    SetAuthorizationHeader(token);
  }, [token]);

  useEffect(() => {
    if (isLoggedin) {
      const intervalId = setInterval(() => {
        dispatch(doValidateToken());
      }, 3000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dispatch, isLoggedin]);
  return <></>;
};
