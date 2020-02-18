import { Group } from '@models/Group';
import { User } from '@models/User';
import { Connection, createConnection } from 'typeorm';

import DatabaseUtils from '../utils/DatabaseUtils';

describe('User', () => {
  let connection: Connection;

  beforeEach(async () => {
    connection = await createConnection();
    await DatabaseUtils.truncate();
  });

  // afterEach(async () => {});

  it('should encrypt user password', async () => {
    const group = new Group({
      title: 'test/group',
    });
    await connection.manager.save(group);

    const user = new User({
      name: 'Felipe Passos',
      email: 'passos.fe@gmail.com',
      password: '123456',
      group_id: group.id,
    });
    await connection.manager.save(user);

    const compareHash = await user.checkPassword('123456');

    expect(compareHash).toBe(true);
  });
});
