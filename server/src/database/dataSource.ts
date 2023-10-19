import { DataSource } from 'typeorm';
import { config } from '../config/config';

const dataSource = new DataSource({
  ...config?.database,
});

export default dataSource;
