export interface IDatabaseConfig {
  dbUri: string;
}

export default (): IDatabaseConfig => ({
  dbUri: process.env.DB_URI,
});
