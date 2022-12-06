import { HttpException } from '@nestjs/common';
import { ApiException, IAPIResponseBase } from './APICallMapper';

type errorCatcher = { status: number; message: string };
export function catchHandler(error: errorCatcher): IAPIResponseBase {
  throw new HttpException(
    new ApiException(error.status, error.message),
    error.status,
  );
}
