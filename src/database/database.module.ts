import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleAsyncOptions } from '@nestjs/mongoose';

import { IDatabaseConfig } from '@src/configs/database.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService<IDatabaseConfig>) =>
        ({
          uri: configService.get('dbUri'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
        } as MongooseModuleAsyncOptions),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
