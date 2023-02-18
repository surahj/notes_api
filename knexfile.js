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
  connection: process.env.DATABASE_URL
};
