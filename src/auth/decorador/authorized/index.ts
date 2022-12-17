import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

export const Authorized = () => (target: any, arg0?: any, arg1?: any) => {
  UseGuards(JwtAuthGuard)(target, arg0, arg1);
  ApiBearerAuth()(target, arg0, arg1);
};
