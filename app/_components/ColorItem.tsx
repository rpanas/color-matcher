import { ReactElement, useMemo } from "react";
import Color from "@/app/_interfaces/Color";

import "@/app/styles/color-item.css";
import Link from "next/link";

function percentFromValue(value: number, percent?: number): number {
  return percent ? value * percent / 100 : value;
}

export default function ColorItem({ color, name, compareColor, percent }: Omit<Color, 'id'>): ReactElement {

  const colorStyle = useMemo(() => {
    return { backgroundColor: color };
  }, [color]);

  const compareColorStyle = useMemo(() => {
    return compareColor ? { backgroundColor: `#${compareColor}` } : null;
  }, [compareColor])

  return (
    <Link
      href={`/colors/${color.replace('#', '')}`}
      className="color-item"
    >
      <div
        className="flex h-full"
      >
        <div
          className="color-visualization"
          style={colorStyle}
        ></div>
        {
          compareColorStyle && (
            <div
              className="color-visualization"
              style={compareColorStyle}
            ></div>
          )
        }
      </div>
      <div
        className="title"
      >
        <span className="color">{color}{percent ? ` - ${percent}%` : ''}</span>
        <span className="name">{name}</span>
      </div>
    </Link>
  );
}
