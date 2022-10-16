export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  jwt: {
    secretKey: process.env.SECRET_KEY,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASS,
    name: process.env.DATABASE_NAME,
  },
});
