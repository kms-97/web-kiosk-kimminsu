import { DataSource } from 'typeorm';
import { entities } from 'src/entity';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: process.env.DATABASE_TYPE,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        database: process.env.DATABASE,
        entities: [...entities],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
