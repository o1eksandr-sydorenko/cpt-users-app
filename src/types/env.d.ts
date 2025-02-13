declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: string;
    APP_HOST: string;
    NODE_ENV?: string;
  }
}
