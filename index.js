var intersectRayTriangle = require('ray-triangle-intersection')
var intersectRayPlane = require('ray-plane-intersection')
var intersectRaySphere = require('ray-sphere-intersection')
var intersectRayBox = require('ray-aabb-intersection')
var copy3 = require('gl-vec3/copy')

module.exports = Ray
function Ray (origin, direction) {
  this.origin = origin || [ 0, 0, 0 ]
  this.direction = direction || [ 0, 0, -1 ]
}

Ray.prototype.set = function (origin, direction) {
  this.origin = origin
  this.direction = direction
}

Ray.prototype.copy = function (other) {
  copy3(this.origin, other.origin)
  copy3(this.direction, other.direction)
}

Ray.prototype.clone = function () {
  var other = new Ray()
  other.copy(this)
  return other
}

Ray.prototype.intersectsSphere = function (center, radius) {
  var tmp3 = [0, 0, 0]
  return intersectRaySphere(tmp3, this.origin, this.direction, center, radius)
}

Ray.prototype.intersectsPlane = function (normal, distance) {
  var tmp3 = [0, 0, 0]
  return intersectRayPlane(tmp3, this.origin, this.direction, normal, distance)
}

Ray.prototype.intersectsTriangle = function (triangle) {
  var tmp3 = [0, 0, 0]
  return intersectRayTriangle(tmp3, this.origin, this.direction, triangle)
}

Ray.prototype.intersectsBox = function (aabb) {
  var tmp3 = [0, 0, 0]
  return intersectRayBox(tmp3, this.origin, this.direction, aabb)
}

Ray.prototype.intersectsTriangleCell = function (cell, positions) {
  var tmpTriangle = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
  var a = cell[0], b = cell[1], c = cell[2]
  tmpTriangle[0] = positions[a]
  tmpTriangle[1] = positions[b]
  tmpTriangle[2] = positions[c]
  return this.intersectsTriangle(tmpTriangle)
}
