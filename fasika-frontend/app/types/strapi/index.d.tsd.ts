declare module '@strapi/strapi' {
  interface Strapi {
    plugins: {
      email: {
        services: {
          email: {
            send(options: {
              to: string;
              from?: string;
              subject: string;
              text: string;
              html: string;
            }): Promise<void>;
          };
        };
      };
    };
    log: {
      error(message: string, error?: Error): void;
    };
  }

  const strapi: Strapi;
  export default strapi;
}