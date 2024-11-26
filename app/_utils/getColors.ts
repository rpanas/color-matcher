import path from "node:path";
import fs from "node:fs";
import Color from "@/app/_interfaces/Color";

export function getColors(): Color[] {
  try {
    const filePath = path.join(process.cwd(), 'public', 'mocks', 'Colors.json');

    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error("Failed to parse the Colors file", error);
    return [];
  }
}
