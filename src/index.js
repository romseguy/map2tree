import isPlainObject from 'lodash/isPlainObject';
import objType from './objType';

function isList(maybeList) {
  // immutable.js implementation detail but I don't know how to check whether an Iterable is a List without `Immutable.List.isList`
  const IS_LIST_SENTINEL = '@@__IMMUTABLE_LIST__@@';
  return !!(maybeList && maybeList[IS_LIST_SENTINEL]);
}

function createNode(rootNodeKey, root, pushMethod) {
  const rootType = objType(root);
  let newNode = {name: rootNodeKey};

  switch (rootType) {
    case 'Array':
      newNode.children = [];

      root.forEach((value, index) => {
        newNode.children[pushMethod]({
          name: `${rootNodeKey}[${index}]`,
          [isPlainObject(value) ? 'object' : 'value']: value
        });
      });
      break;
    case 'Iterable':
      newNode.children = [];

      for (const entry of root) {
        let key = null;
        let value = null;

        if (Array.isArray(entry)) {
          [key, value] = entry;
        } else {
          key = `${rootNodeKey}[${newNode.children.length}]`;
          value = entry;
        }

        const valueType = objType(value);
        let childNode = {
          name: key
        };

        if (valueType === 'Array' || valueType === 'Iterable' || valueType === 'Object') {
          if (valueType === 'Iterable' && isList(root)) {
            childNode.object = value.toJS();
          } else {
            childNode = createNode(key, value, pushMethod)
          }
        } else {
          childNode.value = value;
        }

        newNode.children[pushMethod](childNode);
      }
      break;
    case 'Object':
      newNode.children = [];

      const rootKeys = Object.keys(root);

      for (let i = 0; i < rootKeys.length; i++) {
        const rootKey = rootKeys[i];
        const rootValue = root[rootKey];
        const rootValueType = objType(rootValue);
        let childNode = {name: rootKey, value: rootValue};

        if (rootValueType === 'Array' || rootValueType === 'Iterable' || rootValueType === 'Object') {
          childNode = createNode(rootKey, rootValue, pushMethod)
        }

        newNode.children[pushMethod](childNode);
      }
      break;
    default:
      newNode.value = value;
  }

  return newNode;
}

export default function map2tree(root, options = {}) {
  const {
    key:rootNodeKey = 'state',
    pushMethod = 'push'
    } = options;

  return createNode(rootNodeKey, root, pushMethod);
}
