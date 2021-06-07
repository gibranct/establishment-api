import * as env from 'env-var'

const environments = {
  test: {
    type: 'sqlite',
    database: 'my-data.sql',
    synchronize: true,
  },
  development: {
    type: 'postgres',
    synchronize: false,
    host: 'localhost',
    port: 5432,
    username: 'test',
    password: 'postgres',
    database: 'test',
  },
  production: {
    type: 'postgres',
    synchronize: true,
    host: env.get('DB_HOST').default('127.0.0.1').asString(),
    port: env.get('DB_PORT').default(5432).asIntPositive(),
    username: env.get('DB_USER').default('root').asString(),
    password: env.get('DB_PASS').default('root').asString(),
    database: env.get('DB_NAME').default('establishment-db').asString(),
  },
}

export default environments[process.env.NODE_ENV || 'development']
