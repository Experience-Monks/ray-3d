# ray-3d

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

A high-level ray picking helper for 3D intersection, built from modular pieces.

```js
var Ray = require('ray-3d')

var ray = new Ray(origin, direction)

if (ray.intersectsSphere(center, radius)) {
  console.log("Hit a sphere!")
}
```

Features:

- `intersectsSphere`
- `intersectsPlane`
- `intersectsTriangle`
- `intersectsTriangleCell`

The API is still experimental, and missing some features:

- `ray-ray-intersection`
- `ray-mesh-intersection` (simplicial complex)
- `ray-box-intersection`

## Usage

[![NPM](https://nodei.co/npm/ray-3d.png)](https://www.npmjs.com/package/ray-3d)

#### `ray = new Ray([origin, direction])`

Creates a new `Ray` with optional `origin` and `direction`, both arrays in the form `[x, y, z]`. 

`origin` defaults to `[0, 0, 0]` and `direction` defaults to `[0, 0, -1]`.

#### `ray.set(origin, direction)`

Assigns this ray's `origin` and `direction` to the given values.

#### `ray.copy(otherRay)`

Copies the `origin` and `direction` from the `otherRay` into this ray.

#### `otherRay = ray.clone()`

Deep clones this ray into a new `Ray` instance.

---

### intersections

All intersection methods return the collision point `[x, y, z]` if one occurred, which is re-used across calls to avoid GC thrashing. 

If no collision occurred, the methods return `null`.

#### `ray.intersectsPlane(normal, distance)`

Whether this ray intersects the plane with the unit `normal` [x, y, z] and `distance` from origin.

#### `ray.intersectsSphere(center, radius)`

Whether this ray intersects with the sphere at `center` [x, y, z] and `radius`.

#### `ray.intersectsTriangle(triangle)`

Whether this ray intersects with the `triangle`:

```
[ [x1, y1, z1], [x2, y2, z2], [x3, y3, z3] ]
```

#### `ray.intersectsTriangleCell(cell, positions)`

Whether this ray intersects with the triangle cell, where `cell` is a face like so:

```
[ a, b, c ]
```

Where `[ a, b, c ]` are indices into the `positions` array:

```
[ [x1, y1, z1], [x2, y2, z2] ... ]
```

This is useful for indexed meshes and simplicial complexes like [icosphere](https://www.npmjs.com/package/icosphere).

## See Also

- [camera-unproject](https://www.npmjs.com/package/camera-unproject)
- [camera-project](https://www.npmjs.com/package/camera-project)
- [camera-picking-ray](https://www.npmjs.com/package/camera-picking-ray)
- [ray-sphere-intersection](https://www.npmjs.com/package/ray-sphere-intersection)
- [ray-plane-intersection](https://www.npmjs.com/package/ray-plane-intersection)
- [ray-triangle-intersection](https://www.npmjs.com/package/ray-triangle-intersection)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/ray-3d/blob/master/LICENSE.md) for details.
