// module.exports = {
//   development: {
//     client: 'pg',
//     connection: {
//       host: '127.0.0.1',
//       user: 'postgres',
//       password: '',
//       database: 'note'
//     }
//   }
// };
module.exports = {
  client: 'pg',
  connection: {
  connectionString: process.env.DATABASE_URL,
  host : process.env.HOSTNAME,
  user : process.env.USERNAME,
  password : process.env.DB_PASSWORD,
  database : process.env.DATABASE, 
  ssl: {rejectUnauthorized: false}
  }
};
