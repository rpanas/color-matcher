import Color from "@/app/_interfaces/Color";
import Vector from "@/app/_utils/Vector";
import ClosestColorInfo from "@/app/_interfaces/ClosestColorInfo";

export const MAX_DISTANCE = 441.6729559300637;

export const hexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

function hexToRgb(hex: string): Vector {
  const result = hexRegex.exec(hex);
  if (!result) {
    throw new Error(`Invalid color: ${hex}`);
  }
  return new Vector(
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  );

}

function getDiffColor(colorA: string, colorB: string) {
  try {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);

    return a.distance(b);
  } catch (e) {
    return MAX_DISTANCE;
  }

}


/**
 *  For a rounded percentage, a larger value means the color is not close to the desired color. To change this ratio, use `100 - <rounded percentage>`
 */
function getDiffColorInPercent(colorA: string, colorB: string): number {
  const distance = getDiffColor(colorA, colorB);

  const closestPercent = 100 - distance * 100 / MAX_DISTANCE;

  return (Math.round(closestPercent * 10) / 10);
}

export default function findClosestColorTo(compareColor: string, colors: Color[], minPercent: number = 70): ClosestColorInfo[] {
  return colors.reduce<ClosestColorInfo[]>((memo, colorInfo) => {

    const percent = getDiffColorInPercent(compareColor, colorInfo.color);

    if (percent >= minPercent) {
      memo.push({
          ...colorInfo,
          percent: percent,
          compareColor: compareColor,
        }
      )
    }
    return memo;
  }, []).sort((a, b) => {
    return b.percent - a.percent;
  });
}
