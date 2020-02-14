import { User } from '@models/User';
import factory from 'factory-girl';
import faker from 'faker';

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  is_admin: faker.random.boolean(),
  group_id: faker.random.uuid(),
});

export default factory;
