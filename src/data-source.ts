import { DataSource, DataSourceOptions } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { User } from "./users/entities/user.entity";
import { Image } from "./images/entities/image.entity";
import { config } from "dotenv";
import { join } from "path";

config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_DATABASE'),
    entities: [User, Image],
    migrations: [join('dist', 'migrations', '*.js')],
    synchronize: false,
}
const dataSource = new DataSource(dataSourceOptions)
export default dataSource