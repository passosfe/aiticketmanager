import { entities } from '@database/index';

function truncate(): Promise<void[]> {
  return Promise.all(
    entities.map(entity => {
      return entity.clear();
    }),
  );
}

export default truncate;
