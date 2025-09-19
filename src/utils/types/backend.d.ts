export { };
// https://bobbyhadz.com/blog/typescript-make-types-global#declare-global-types-in-typescript

declare global {
  interface IRequest {
    url: string;
    method: string;
    body?: { [key: string]: any };
    queryParams?: any;
    useCredentials?: boolean;
    headers?: any;
    nextOption?: any;
  }

  interface IBackendRes<T> {
    Message?: string;
    StatusCode: number;
    Data?: T;
    message?: string;
    statusCode: number;
    data?: T;
    error?: string
  }

  interface IReqSignIn {
    user: object,
    accessToken: string
  }

  interface IBackendOdataRes<T> {
    '@odata.count'?: number;
    '@odata.nextLink'?: string;
    '@odata.context'?: string;
    value: T[]
  }
}