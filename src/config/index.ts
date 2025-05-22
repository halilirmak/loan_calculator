import * as dotenv from "dotenv";
import DEVELOPMENT from "./env/dev";

dotenv.config();

export type Configuration = {
  NODE_ENV: string;
  PORT: number;
  APP_NAME: string;
  APP_LOG_LEVEL: string;
};

let defaultConfig: Configuration = DEVELOPMENT;

export { defaultConfig as config };
