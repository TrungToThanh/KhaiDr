import { NextResponse } from "next/server";
import { getAccessToken, RETAILER } from "../lib/api";

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const categoryResponse = await fetch(
      "https://public.kiotapi.com/categories",
      {
        method: "GET",
        headers: {
          Retailer: RETAILER,
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!categoryResponse.ok) throw new Error("Lỗi khi lấy danh mục");

    const categories = await categoryResponse.json();
    return NextResponse.json({ categories: categories.data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi hệ thống" },
      { status: 500 }
    );
  }
}
