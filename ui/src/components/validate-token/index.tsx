import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doValidateToken } from "reducers";
import { SetAuthorizationHeader } from "services/api";
import { IStore } from "types";

export const ValidateToken = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: IStore) => state.auth.token);
  const isLoggedIn = useSelector((state: IStore) => state.auth.isLoggedIn);
  useEffect(() => {
    SetAuthorizationHeader(token);
  }, [token]);

  useEffect(() => {
    if (isLoggedIn) {
      const intervalId = setInterval(() => {
        dispatch(doValidateToken());
      }, 30000);
      return () => {
        clearInterval(intervalId);
      };
    }
  }, [dispatch, isLoggedIn]);
  return <></>;
};
