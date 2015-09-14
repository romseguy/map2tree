import isArray from 'lodash/lang/isArray';
import isPlainObject from 'lodash/lang/isPlainObject';
import mapValues from 'lodash/object/mapValues';

function visit(parent, visitFn, childrenFn) {
  if (!parent) return;

  visitFn(parent);

  let children = childrenFn(parent);
  if (children) {
    let count = children.length;
    for (let i = 0; i < count; i++) {
      visit(children[i], visitFn, childrenFn);
    }
  }
}

function getNode(tree, key) {
  let node = null;

  visit(tree, d => {
    if (d.name === key) {
      node = d;
    }
  }, d => d.children);

  return node;
}

export default function map2tree(rootNode, options = {key: 'state', pushMethod: 'push'}, tree = {name: options.key, children: []}) {
  if (!isPlainObject(rootNode)) {
    return {};
  }

  const { key, pushMethod } = options;
  const currentNode = getNode(tree, key);

  if (currentNode === null) {
    return {};
  }

  mapValues(rootNode, (stateValue, stateKey) => {
    let newNode = {name: stateKey};

    if (isArray(stateValue) || isPlainObject(stateValue)) {
      newNode.children = [];

      if (isArray(stateValue) && stateValue.length !== 0) {
        stateValue.forEach((obj, i) => newNode.children[pushMethod]({
          name: `${stateKey}[${i}]`,
          [isPlainObject(obj) ? 'object' : 'value']: obj
        }));
      }
    } else {
      newNode = {...newNode, value: stateValue};
    }

    currentNode.children[pushMethod](newNode);

    map2tree(stateValue, {key: stateKey, pushMethod}, tree);
  });

  return tree;
}
