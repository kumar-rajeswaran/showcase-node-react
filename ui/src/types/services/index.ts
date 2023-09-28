export interface IApiResponse<T> {
  status?: number;
  message?: string | null;
  data: T | null;
}
