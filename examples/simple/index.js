import map2tree from 'map2tree';

const someMap = {
  someStore: {
    todos: [
      { title: 'map'},
      { title: 'to' },
      { title: 'tree' },
      { title: 'map2tree' }
    ],
    completedCount: 1
  },
  otherStore: {
    foo: 0,
    bar: { key: 'value' }
  }
};

const tree = map2tree(someMap, 'map');

/*eslint-disable*/
console.log(tree);
/*eslint-enable*/
