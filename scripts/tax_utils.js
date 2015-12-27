
/**
 * 1000円未満切り捨て
 * @param v
 */
export function floor1000(v) {
  return Math.floor(v / 1000) * 1000;
}

/**
 * 100円未満切り捨て
 * @param v
 */
export function floor100(v) {
  return Math.floor(v / 100) * 100;
}
