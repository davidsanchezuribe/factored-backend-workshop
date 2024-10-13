declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DEV_PORT: number;
    PROD_PORT: number;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    DB_PORT: number;
    FAKE_DATABASE: string | undefined;//
  }
}
