import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { config, datasource } from '../datasource';
import { setupDataSource } from '../test/setup';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

// https://github.com/oguimbal/pg-mem/issues/61
// Trace issue typeorm with pg-mem
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        migrationsRun: false
      }),
      dataSourceFactory: async () => {
        if (process.env.NODE_ENV === 'test') {
          console.log('go here');
          return setupDataSource();
        } else return datasource;
      },
    }),
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
