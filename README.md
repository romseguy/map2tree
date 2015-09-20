map2tree
=========================
Just a function™

Input:

```javascript
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
```

Output:

```javascript
{
  name: `${whateverNameYouPassedAsSecondArgument)`,
  children: [
    {
      name: 'someStore',
      children: [
        {
          name: 'todos',
          children: [
            {
              name: 'todo[0'],
              object: {
                title: 'map'
              }
            }
          ]
        }
      ]
    },
    {
      name: 'otherStore',
      children: [
        {
          name: 'foo',
          value: 0
        },
        {
          name: 'bar',
          object: {
            key: 'value'
          }
        }
      ]
    }
  ]
}
```

[Full example](https://github.com/romseguy/map2tree/blob/master/examples/simple/index.js)
