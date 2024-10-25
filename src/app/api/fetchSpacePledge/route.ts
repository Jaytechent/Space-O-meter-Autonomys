// src/app/api/fetchSpacePledge/route.ts
import { formatSpacePledged } from "@/utils/number";
import { spacePledge } from "@autonomys/auto-consensus";
import { activate } from "@autonomys/auto-utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api = await activate({ networkId: "" });
    const total = await spacePledge(api);
    await api.disconnect();
    const formattedPledge = formatSpacePledged(total);
    return NextResponse.json({ pledge: formattedPledge });
  } catch (error) {
    console.error("Error fetching space pledge:", error);
    return NextResponse.error();
  }
}
