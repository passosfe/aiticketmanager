import { Group } from '@models/Group';
import faker from 'faker';
import { Connection } from 'typeorm';

import { User } from '../src/app/models/User';

export const UserFactory = {
  build: (attrs: Partial<User> = {}): User => {
    const userAttrs: Partial<User> = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      is_admin: faker.random.boolean(),
      ...attrs,
    };

    return new User(userAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<User> = {},
  ): Promise<User> => {
    const user = UserFactory.build(attrs);
    return connection.manager.save(user);
  },
};

export const GroupFactory = {
  build: (attrs: Partial<Group> = {}): Group => {
    const userAttrs: Partial<Group> = {
      title: faker.random.words(4),
      ...attrs,
    };

    return new Group(userAttrs);
  },
  create: async (
    connection: Connection,
    attrs: Partial<Group> = {},
  ): Promise<Group> => {
    const group = GroupFactory.build(attrs);
    return connection.manager.save(group);
  },
};
