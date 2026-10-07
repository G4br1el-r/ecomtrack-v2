export type RemovedItem<T> = {
  item: T;
  index: number;
};

export type RemovalResult<T> = {
  list: T[];
  removed: RemovedItem<T> | null;
};
