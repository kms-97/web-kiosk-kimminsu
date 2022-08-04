declare namespace NodeJS {
  interface ProcessEnv {
    readonly DATABASE_TYPE: any;
    readonly DATABASE_HOST: string;
    readonly DATABASE_PORT: number;
    readonly DATABASE_USERNAME: string;
    readonly DATABASE: string;
  }
}
