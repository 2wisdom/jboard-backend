import { TypeOrmModule } from '@nestjs/typeorm';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

export const loadEntity = (entities: EntityClassOrSchema[]) => {
  return TypeOrmModule.forFeature(entities);
};
