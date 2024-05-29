// config/error.js

// data를 받아서 BaseError 객체를 만듦
// data -> response.status.js에
export class BaseError extends Error {
  constructor(data) {
    super(data.message);
    this.data = data;
  }
}
