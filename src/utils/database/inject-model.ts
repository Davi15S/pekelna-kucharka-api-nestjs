import { InjectModel as IM } from '@nestjs/mongoose';

export const InjectModel = (model: { name: string }) => IM(model.name);
