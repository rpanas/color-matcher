import { NextResponse } from "next/server";

export async function GET(reg: Request) {

  // return NextResponse.json({ status: 'Running...🚀' });
  return NextResponse.redirect(new URL('/', reg.url));
}
