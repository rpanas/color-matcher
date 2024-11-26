import { getColors } from "@/app/_utils/getColors";
import ColorsList from "@/app/_components/ColorsList";
import findClosestColorTo from "@/app/_utils/findClosestColorTo";
import "@/app/styles/color-analytics.css"
import Color from "@/app/_interfaces/Color";
import Link from "next/link";

interface ColorAnalyticsProps {
  params: Promise<{ color: string }>;
}

function findMatchingColors(selectedColor: Color, colors: Color[]): Color[] {
  return colors.filter(colorInfo => colorInfo.name !== selectedColor.name && colorInfo.color.includes(selectedColor.color));
}


export default async function ColorAnalytics({ params }: ColorAnalyticsProps) {
  const colors = getColors();

  const { color } = await params;
  const colorWithHex = `#${color}`;

  const selectedColorInfo = colors.find(colorInfo => colorInfo.color.includes(color));

  const closestColors = findClosestColorTo((await params).color, colors, 1).slice(1);
  const sameColors = selectedColorInfo ? findMatchingColors(selectedColorInfo, colors) : [];

  return (
    <div
      className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
    >
      <div className="color-info">
        <div
          className="selected-color"
          style={{ backgroundColor: colorWithHex }}
        >
          <Link href={'/'}>Back</Link>
          <div className="details">
            <h1>{colorWithHex}</h1>
            <p>{selectedColorInfo?.name}</p>
          </div>
        </div>
        {
          !!sameColors.length && (
            <div className="match-colors">
              <span>Matches:</span>
              {
                sameColors.map(colorInfo => (
                  <span
                    key={colorInfo.id}
                    className="match-color"
                    style={{ backgroundColor: colorWithHex }}
                  >
                    {colorInfo.name}
                  </span>
                ))
              }
            </div>
          )
        }
      </div>
      <div className="background-gradient"></div>
      <ColorsList colors={closestColors}/>
      <header className="w-full"></header>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full mt-10"></main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
