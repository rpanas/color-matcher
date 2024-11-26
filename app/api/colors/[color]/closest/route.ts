import { NextResponse } from "next/server";
import { getColors } from "@/app/_utils/getColors";
import ClosestColorInfo from "@/app/_interfaces/ClosestColorInfo";
import findClosestColorTo from "@/app/_utils/findClosestColorTo";

export async function GET(req: Request, { params }: {
  params: { color: string }
}): Promise<NextResponse<ClosestColorInfo[]>> {
  if (!params.color) {
    return NextResponse.json({ error: "Invalid api path", status: 400 } as any);
  }

  const { searchParams } = new URL(req.url);
  const percent = searchParams.get('min-percent');
  const colors = getColors();
  return NextResponse.json(findClosestColorTo(params.color, colors, percent === null ? 70 : Number(percent)));
}
