import { NextResponse } from "next/server";
import fs from 'fs';
import path from "node:path";

import { getColors } from "@/app/_utils/getColors";
import Color from "@/app/_interfaces/Color";
import parseFile from "@/app/_utils/parseFile";

export async function GET(): Promise<NextResponse<Color[]>> {
  const colors = getColors();
  return NextResponse.json(colors);
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
  }

  const colors = await parseFile(file)

  fs.writeFileSync(path.join(process.cwd(), 'public', 'mocks', 'Colors.json'), JSON.stringify(colors));

  return NextResponse.json(colors);
}
