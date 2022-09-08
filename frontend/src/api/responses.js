export const STATUS_CODE_OKAY = 200
export const STATUS_CODE_CREATED = 201
export const STATUS_CODE_BAD_REQUEST = 400
export const STATUS_CODE_FORBIDDEN = 403
export const STATUS_CODE_CONFLICT = 409
export const STATUS_CODE_INTERNAL_SERVER_ERROR = 500

export class ResponseException {
  constructor(message) {
    this.message = message;
  }
}