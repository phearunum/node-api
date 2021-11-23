const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '123',
    database: env.DB_NAME || 'spring_db',
    port:3308
  },
  listPerPage: env.LIST_PER_PAGE || 10,
};


module.exports = config;