import { IAuthJob } from '@root/features/auth/interfaces/auth.interface';
import { baseQueue } from './base.queue';
import { authWorker } from '@worker/auth.worker';

class AuthQueue extends baseQueue {
  constructor() {
    super('auth');
    this.processJob('addAuthUserToDB', 5, authWorker.addAuthUserToDb);
  }

  public addAuthUserJob(name: string, data: IAuthJob): void {
    this.addJob(name, data);
  }
}

export const authQueue: AuthQueue = new AuthQueue();
