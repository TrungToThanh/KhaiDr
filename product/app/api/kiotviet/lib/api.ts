export const CLIENT_ID = "6e081514-aadf-4afb-a27c-534f6718b8c7";
export const CLIENT_SECRET = "4C2550489766B9573088A2F253B070FF296236D3";
export const RETAILER = "lex7pharma";

export async function getAccessToken() {
  const response = await fetch("https://id.kiotviet.vn/connect/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "client_credentials",
      scope: "PublicApi.Access",
    }).toString(),
  });

  console.log("✅ Kết quả trả về từ KiotViet:", response);

  if (!response.ok) throw new Error("Lỗi khi lấy Access Token");
  const data = await response.json();
  return data.access_token;
}
