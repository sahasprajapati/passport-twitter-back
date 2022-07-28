export class Response<T> {
  data?: T;
  success: boolean;
  message: string;
  constructor() {
    this.success = true;
    this.message = "Action performed successfully";
  }
}
