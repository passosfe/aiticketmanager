import { Group } from '@models/Group';
import { User } from '@models/User';

import TestUtils from '../utils/TestUtils';

describe('User', () => {
  beforeAll(async () => {
    await TestUtils.connect();
  });

  beforeEach(async () => {
    await TestUtils.truncate();
  });

  afterAll(async () => {
    await TestUtils.disconnect();
  });

  it('should encrypt user password', async () => {
    const group = new Group({
      title: 'test/group',
    });
    await TestUtils.connection.manager.save(group);

    const user = new User({
      name: 'Felipe Passos',
      email: 'passos.fe@gmail.com',
      password: '123456',
      group_id: group.id,
    });
    await TestUtils.connection.manager.save(user);

    const compareHash = await user.checkPassword('123456');

    expect(compareHash).toBe(true);
  });
});
