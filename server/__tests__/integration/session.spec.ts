import { Group } from '@models/Group';
import request from 'supertest';

import app from '../../src/app';
import { UserFactory, GroupFactory } from '../factories';
import TestUtils from '../utils/TestUtils';

describe('Authentication', () => {
  beforeAll(async () => {
    await TestUtils.connect();
  });

  beforeEach(async () => {
    await TestUtils.truncate();
  });

  afterAll(async () => {
    await TestUtils.disconnect();
  });

  it('should authenticate with valid credentials', async () => {
    const group = await GroupFactory.create(TestUtils.connection, {});

    const user = await UserFactory.create(TestUtils.connection, {
      password: '123123',
      group_id: group.id,
    });

    const response = await request(app)
      .post('/sessions')
      .send({
        email: user.email,
        password: '123123',
      });

    expect(response.status).toBe(200);
  });
});
