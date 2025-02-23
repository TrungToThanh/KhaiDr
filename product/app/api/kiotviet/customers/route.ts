import { NextResponse } from "next/server";
import { getAccessToken, RETAILER } from "../lib/api";

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const branchesResponse = await fetch(
      "https://public.kiotapi.com/customers",
      {
        method: "GET",
        headers: {
          Retailer: RETAILER,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!branchesResponse.ok) throw new Error("Lỗi khi lấy sản phẩm");

    const products = await branchesResponse.json();
    return NextResponse.json({ products: products.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}
