export type BaseConfig = {
  port: number;
};

export const baseConfig = (): BaseConfig => ({
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
});
