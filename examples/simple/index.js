import mapToTree from 'mapToTree'

const someMap = {
  someStore: {
    todos: [
      { title: 'map'},
      { title: 'To' },
      { title: 'Tree' },
      { title: 'mapToTree' }
    ],
    completedCount: 1
  },
  otherStore: {
    foo: 0,
    bar: { key: 'value' }
  }
};

const tree = mapToTree(someMap, 'map');

console.log(tree);
