import { Group } from '@models/Group';
import { User } from '@models/User';
import bcrypt from 'bcryptjs';
import { Connection, createConnection } from 'typeorm';

import truncate from '../utils/truncate';

describe('User', () => {
  let connection: Connection;

  beforeEach(async () => {
    connection = await createConnection();
    await truncate();
  });

  it('should encrypt user password', async () => {
    const group = Group.create({
      title: 'test/group',
    });
    await connection.manager.save(group);

    const user = User.create({
      name: 'Felipe Passos',
      email: 'passos.fe@gmail.com',
      password: '123456',
      group_id: group.id,
    });
    await connection.manager.save(user);

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });
});
