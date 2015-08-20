import isArray from 'lodash/lang/isArray';
import isPlainObject from 'lodash/lang/isPlainObject';
import mapValues from 'lodash/object/mapValues'

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
  let node;

  visit(tree, d => {
    if (d.name === key) {
      node = d;
    }
  }, d => d.children);

  return node;
}

export default function mapStateToTree(state, key, tree) {
  if (!isArray(state) && !isPlainObject(state)) {
    return {};
  }

  tree = tree || { name: key, children: [] };
  const currentNode = getNode(tree, key);

  mapValues(state, (stateValue, stateKey) => {
    let newNode = { name: stateKey };
    let leaf = false;

    if (isArray(stateValue) || isPlainObject(stateValue)) {
      newNode.children = [];

      if (isArray(stateValue) && stateValue.length !== 0) {
        stateValue.forEach((obj, i) => newNode.children.push({ name: `${stateKey}Child${i}`, ...obj }));
        leaf = true;
      }
    } else {
      newNode = { ...newNode, value: stateValue };
    }

    currentNode.children.push(newNode);

    mapStateToTree(leaf ? false : stateValue, stateKey, tree);
  });

  return tree;
}
