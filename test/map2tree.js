import test from 'tape';
import map2tree from '../src';
import immutable from 'immutable';

test('# shallow map', nest => {
  nest.test('## value', assert => {
    const map = {
      a: 'foo',
      b: 'bar'
    };

    const expected = {
      name: 'state',
      children: [
        {name: 'a', value: 'foo'},
        {name: 'b', value: 'bar'}
      ]
    };

    assert.deepEqual(map2tree(map), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
    assert.end();
  });

  nest.test('## object', assert => {
    const map = {
      a: {aa: 'foo'}
    };

    const expected = {
      name: 'state',
      children: [
        {name: 'a', children: [{name: 'aa', value: 'foo'}]}
      ]
    };

    assert.deepEqual(map2tree(map), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
    assert.end();
  });
});

test('# deep map', assert => {
  const map = {
    a: {aa: {aaa: 'foo'}}
  };

  const expected = {
    name: 'state',
    children: [
      {
        name: 'a',
        children: [
          {
            name: 'aa',
            children: [
              {name: 'aaa', value: 'foo'}
            ]
          }
        ]
      }
    ]
  };

  assert.deepEqual(map2tree(map), expected);
  assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
  assert.end();
});

test('#array map', nest => {
  const map = {
    a: [
      1,
      2
    ]
  };

  nest.test('## push', assert => {
    const expected = {
      name: 'state',
      children: [{
        name: 'a',
        children: [
          {name: 'a[0]', value: 1},
          {name: 'a[1]', value: 2}]
      }]
    };

    assert.deepEqual(map2tree(map), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
    assert.end();
  });

  nest.test('## unshift', assert => {
    const options = {pushMethod: 'unshift'};
    const expected = {
      name: 'state',
      children: [{
        name: 'a',
        children: [
          {name: 'a[1]', value: 2},
          {name: 'a[0]', value: 1}
        ]
      }]
    };

    assert.deepEqual(map2tree(map, options), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map), options), expected, 'immutable');
    assert.end();
  });
});

test('# collection map', nest => {
  nest.test('## value', assert => {
    const map = {
      a: [
        {aa: 1},
        {aa: 2}
      ]
    };

    const expected = {
      name: 'state',
      children: [
        {
          name: 'a',
          children: [
            {name: 'a[0]', object: {aa: 1}},
            {name: 'a[1]', object: {aa: 2}}
          ]
        }
      ]
    };

    assert.deepEqual(map2tree(map), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
    assert.end();
  });

  nest.test('## object', assert => {
    const map = {
      a: [
        {aa: {aaa: 'foo'}}
      ]
    };

    const expected = {
      name: 'state',
      children: [
        {
          name: 'a',
          children: [
            {name: 'a[0]', object: {aa: {aaa: 'foo'}}}
          ]
        }
      ]
    };

    assert.deepEqual(map2tree(map), expected);
    assert.deepEqual(map2tree(immutable.fromJS(map)), expected, 'immutable');
    assert.end();
  })
});
