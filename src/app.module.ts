import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/domain/user.entity';

@Module({
  imports: [
    UserModule,
    WalletModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'METAAPP-LT-1',
      port: 1433,
      username: 'root',
      password: '123456',
      database: 'DomainDB',
      entities: [UserEntity],
      synchronize: true,
      extra: {
        trustServerCertificate: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
