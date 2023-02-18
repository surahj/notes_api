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
  port : 5432,
  ssl: {rejectUnauthorized: false}
  }
};
