var Ray = require('./')
var test = require('tape')

test('a high-level picking ray helper for 3D intersection', function(t) {
  var ray = new Ray()
  t.deepEqual(ray.origin, [0, 0, 0], 'default origin')
  t.deepEqual(ray.direction, [0, 0, -1], 'default direction')

  ray.set([ -1, -1, -1 ], [0, 2, 3])
  t.deepEqual(ray.origin, [-1, -1, -1], 'changes origin')
  t.deepEqual(ray.direction, [0, 2, 3], 'changes direction')


  ray.copy(new Ray([0, 0, 0], [5, 5, 5]))
  t.deepEqual(ray.origin, [0, 0, 0], 'copies origin')
  t.deepEqual(ray.direction, [5, 5, 5], 'copies direction')

  var r2 = ray.clone()
  t.notEqual(r2.origin, ray.origin, 'clones')
  t.notEqual(r2.direction, ray.direction, 'clones')
  t.deepEqual(r2.origin, ray.origin, 'clones')
  t.deepEqual(r2.direction, ray.direction, 'clones')

  t.end()
})

test.only('methods do not share state between calls', function(t) {
  t.plan(5)

  // All the following values are chosen such that x and xCopy are non-null.
  // This achieves that the functions (indirectly, through subcalls) call
  // gl-matrix/vec3.add or similarly *mutate* their first parameter; this
  // mutation triggered the original problem.
  var ray = new Ray([0, 0, 0], [1, 1, 1])

  var a = ray.intersectsSphere([0, 0, 0], 1)
  var aCopy = [a[0], a[1], a[2]]
  ray.intersectsSphere([0, 0, 0], 2)
  t.deepEqual(a, aCopy)

  var b = ray.intersectsPlane([0, 0, 1], -1)
  var bCopy = [b[0], b[1], b[2]]
  ray.intersectsPlane([0, 0, 1], -2)
  t.deepEqual(b, bCopy)

  var c = ray.intersectsTriangle([
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0]
  ])
  var cCopy = [c[0], c[1], c[2]]
  ray.intersectsTriangle([
    [0, 0, 2],
    [0, 2, 0],
    [2, 0, 0]
  ])
  t.deepEqual(c, cCopy)

  var d = ray.intersectsBox([
    [1, 1, 1],
    [2, 2, 2]
  ])
  var dCopy = [d[0], d[1], d[2]]
  ray.intersectsBox([
    [3, 3, 3],
    [4, 4, 4]
  ])
  t.deepEqual(d, dCopy)

  var e = ray.intersectsTriangleCell([0, 1, 2], [
    [0, 0, 1],
    [0, 1, 0],
    [1, 0, 0]
  ])
  var eCopy = [e[0], e[1], e[2]]
  ray.intersectsTriangleCell([0, 1, 2], [
    [0, 0, 2],
    [0, 2, 0],
    [2, 0, 0]
  ])
  t.deepEqual(e, eCopy)
})