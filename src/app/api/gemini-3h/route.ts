// src/app/api/fetchSpacePledge/route.ts
import { formatSpacePledged } from "@/utils/number";
import {
  blockchainSize,
  blockNumber,
  spacePledged,
} from "@autonomys/auto-consensus";
import { activate, NetworkId } from "@autonomys/auto-utils";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const api = await activate({ networkId: NetworkId.GEMINI_3H });
    const [blockHeight, total, size] = await Promise.all([
      blockNumber(api),
      spacePledged(api),
      blockchainSize(api),
    ]);
    await api.disconnect();
    // const formattedPledge = formatSpacePledged(total);
    // return NextResponse.json({ pledge: formattedPledge });
    return NextResponse.json({
      blockHeight,
      spacePledged: formatSpacePledged(total),
      blockchainSize: formatSpacePledged(size),
    });
  } catch (error) {
    console.error("Error fetching space pledge:", error);
    return NextResponse.error();
  }
}
