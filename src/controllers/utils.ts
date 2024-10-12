const createEntityAdapter = <Type extends { id: number | string }>(collection: Type[]) => collection
  .reduce((adapter: { [key: number | string] : Type }, element) => {
    const { id } = element;
    return { ...adapter, [id]: element };
  }, {});

export default createEntityAdapter;
