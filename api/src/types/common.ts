import { Router } from "express";
import { getReasonPhrase } from "http-status-codes";

export interface IRoutes {
  path?: string;
  router: Router;
}

export class IApiResponse<T> {
  status: number;
  message?: Object | null;
  data: T | null;

  constructor(status: number, data: T | null, error?: Object | null) {
    this.status = status;
    this.data = data;
    this.message = error ? error : getReasonPhrase(status);
  }
}
