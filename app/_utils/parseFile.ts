import crypto from 'crypto';
import Color from "@/app/_interfaces/Color";

/**
 * parse file to extract colors variables
 **/

const regex = /(--|\$)([\w-]*)(:\s)((#[0-9a-f]*)|(rgb\([\w,\s]+\)))(;)/i;

export default async function parseFile(file: File): Promise<Color[]> {
  const buffer = Buffer.from(await file.arrayBuffer())

  const fileLines = buffer.toString().split('\n');

  return fileLines.reduce<Color[]>((memo, line) => {

    const parsedLine = regex.exec(line);

    if (parsedLine) {
      memo.push({
        id: crypto.randomBytes(16).toString("hex"),
        color: parsedLine[4],
        name: parsedLine[1] + parsedLine[2],
      })
    }

    return memo;
  }, [])

}
