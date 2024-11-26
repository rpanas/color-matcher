import { ReactElement } from "react";
import ColorItem from "@/app/_components/ColorItem";
import Color from "@/app/_interfaces/Color";
import "@/app/styles/colors-list.css";

export interface ColorsListProps {
  colors: Color[];
}

export default function ColorsList({ colors }: ColorsListProps): ReactElement {
  return (
    <div className="colors-list">
      {
        colors.map((colorInfo) => (<ColorItem
          key={colorInfo.id}
          color={colorInfo.color}
          compareColor={colorInfo.compareColor}
          percent={colorInfo.percent}
          name={colorInfo.name}
        />))
      }
    </div>
  );
}
