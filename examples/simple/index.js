import map2tree from 'map2tree';
import pretty from 'json-pretty';

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

const tree = map2tree(someMap, {key: 'tree'});

let json = pretty(tree);
json = json.replace(/\n/g, '<br>');
json = json.replace(/\s{2}/g, '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
document.getElementById('root').innerHTML = json;
