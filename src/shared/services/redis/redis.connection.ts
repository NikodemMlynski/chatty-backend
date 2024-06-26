import Logger from 'bunyan';
import { config } from '@root/config';
import { BaseCache } from './base.cache';

const log: Logger = config.createLogger('redisConnection');

class RedisConnection extends BaseCache {
  constructor() {
    super('redisConnection');
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
    } catch (err) {
      log.error(err);
    }
  }
}

export const redisConnection: RedisConnection = new RedisConnection();
