import { immichAppConfig } from '@app/domain';
import { Module, OnModuleInit } from '@nestjs/common';
import { AssetModule } from './api-v1/asset/asset.module';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './api-v1/album/album.module';
import { AppController } from './app.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { TagModule } from './api-v1/tag/tag.module';
import { DomainModule, SearchService } from '@app/domain';
import { InfraModule } from '@app/infra';
import {
  AlbumController,
  APIKeyController,
  AuthController,
  DeviceInfoController,
  JobController,
  OAuthController,
  SearchController,
  ServerInfoController,
  ShareController,
  SystemConfigController,
  UserController,
} from './controllers';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middlewares/auth.guard';
import { AppCronJobs } from './app.cron-jobs';

@Module({
  imports: [
    ConfigModule.forRoot(immichAppConfig),
    DomainModule.register({ imports: [InfraModule] }),
    AssetModule,
    AlbumModule,
    ScheduleModule.forRoot(),
    TagModule,
  ],
  controllers: [
    AppController,
    AlbumController,
    APIKeyController,
    AuthController,
    DeviceInfoController,
    JobController,
    OAuthController,
    SearchController,
    ServerInfoController,
    ShareController,
    SystemConfigController,
    UserController,
  ],
  providers: [
    //
    { provide: APP_GUARD, useExisting: AuthGuard },
    AuthGuard,
    AppCronJobs,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private searchService: SearchService) {}
  async onModuleInit() {
    await this.searchService.bootstrap();
  }
}
