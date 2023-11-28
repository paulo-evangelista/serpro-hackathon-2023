import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Web3Module } from './web3/web3.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwtConstants';
import { GovernmentModule } from './government/government.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';
import { PlatformModule } from './platform/platform.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'user',
            password: 'password',
            database: 'mydb',
            entities: ['dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        Web3Module,
        AuthModule,
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10w' },
        }),
        GovernmentModule,
        UserModule,
        CompanyModule,
        PlatformModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
