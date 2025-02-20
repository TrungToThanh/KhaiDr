import slugify from "slugify";

// Hàm chuyển tiếng Việt có dấu thành không dấu
const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD") // Tách dấu khỏi chữ cái gốc
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu
    .replace(/đ/g, "d") // Chuyển 'đ' thành 'd'
    .replace(/Đ/g, "D");
};

export const generateSlug = (title: string) => {
  const noToneTitle = removeVietnameseTones(title); // Xóa dấu
  return slugify(noToneTitle, { lower: true, strict: true }); // Tạo slug chuẩn
};
