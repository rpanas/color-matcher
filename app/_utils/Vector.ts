export default class Vector {

  constructor(public x: number, public y: number, public z: number) {
  }

  distance(vector: Vector): number {
    return Math.sqrt(
      (vector?.x - this.x) ** 2 + (vector?.y - this.y) ** 2 + (vector?.z - this.z) ** 2
    );
  }
}
