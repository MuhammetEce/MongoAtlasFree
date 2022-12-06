import { HttpStatus } from '@nestjs/common';

export interface IAPIResponseBase {
  error: boolean;
  message: string;
  status: HttpStatus;
  timestamp: number;
  data: any;
}

export interface IAPISuccessResponse<T> extends IAPIResponseBase {
  data: T | any;
}

export class ApiResponseBase<T> {
  public error: boolean;
  public message = '';
  public data: T = null;
  public timestamp = Date.now();
}

export class ApiResponse<T>
  extends ApiResponseBase<T>
  implements IAPISuccessResponse<T>
{
  public error = false;
  public status: HttpStatus = HttpStatus.OK;

  constructor(data: T) {
    super();
    this.data = data;
  }

  toJSON(): IAPISuccessResponse<T> {
    return {
      error: this.error,
      message: this.message,
      status: this.status,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}

export class ApiException
  extends ApiResponseBase<null>
  implements IAPISuccessResponse<null>
{
  public error = true;

  status: HttpStatus;

  constructor(status: HttpStatus, message?: string) {
    super();
    this.status = status;
    this.message = message || '';
  }

  /**
   * Object to raw json convert
   *
   * @returns {IAPIResponseErrorBase}
   * @memberof ApiException
   */
  toJSON(): IAPIResponseBase {
    return {
      error: this.error,
      message: this.message,
      status: this.status,
      data: this.data,
      timestamp: this.timestamp,
    };
  }
}
