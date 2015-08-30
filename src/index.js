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

export default function map2tree(rootNode, key, tree={ name: key, children: [] }) {
  if (!isPlainObject(rootNode)) {
    return {};
  }

  const currentNode = getNode(tree, key);

  if (currentNode === null) {
    return {};
  }

  mapValues(rootNode, (stateValue, stateKey) => {
    let newNode = { name: stateKey };

    if (isArray(stateValue) || isPlainObject(stateValue)) {
      newNode.children = [];

      if (isArray(stateValue) && stateValue.length !== 0) {
        stateValue.forEach((obj, i) => newNode.children.push({ name: `${stateKey}Child${i}`, ...obj }));
      }
    } else {
      newNode = { ...newNode, value: stateValue };
    }

    currentNode.children.push(newNode);

    map2tree(stateValue, stateKey, tree);
  });

  return tree;
}
