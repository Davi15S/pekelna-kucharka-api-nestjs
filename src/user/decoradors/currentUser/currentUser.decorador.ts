import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const CurrentUser = () =>
  createParamDecorator((_, ctx: ExecutionContext) => {
    const http = ctx.switchToHttp();
    const req: Request = http.getRequest();
    return req.user;
  })();
