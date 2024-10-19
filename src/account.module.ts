import { Module } from '@nestjs/common';
import { AppController } from './account.controller';
import { AppService } from './account.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from './entities/account.entity';
import { AccountRepository } from './account.repository';
import { AuthEntity } from './entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [AuthEntity, AccountEntity],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([AuthEntity, AccountEntity]),
    RabbitMQModule,
  ],
  controllers: [AppController],
  providers: [AppService, AccountRepository],
})
export class AppModule {}
