import 'reflect-metadata'
import { createConnection } from 'typeorm'

import Entities from '@entities/index'
import DBConfig from '@config/database'
import logger from './logger'

export default createConnection({
  ...DBConfig,
  entities: [...Object.values(Entities)],
  logging: true,
  maxQueryExecutionTime: 1000,
})
  .then(() => {
    logger.info('Postgres connected')
  })
  .catch((error) => {
    logger.error(error)
    process.exit(1)
  })
