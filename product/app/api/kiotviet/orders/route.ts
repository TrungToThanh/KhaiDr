import { NextRequest, NextResponse } from "next/server";
import { getAccessToken, RETAILER } from "../lib/api";
import { OrderRequest } from "@/app/products/types/kiotviet";

export async function POST(req: NextRequest) {
  try {
    const body: OrderRequest = await req.json();

    // Kiểm tra dữ liệu đầu vào
    if (!body.branchId || !body.purchaseDate || !body.orderDetails?.length) {
      return NextResponse.json(
        { error: "Dữ liệu không hợp lệ" },
        { status: 400 }
      );
    }

    const accessToken = await getAccessToken();

    const response = await fetch("https://public.kiotapi.com/orders", {
      method: "POST",
      headers: {
        Retailer: RETAILER,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Partner: "MyKiot", // Hoặc "KVSync"
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
