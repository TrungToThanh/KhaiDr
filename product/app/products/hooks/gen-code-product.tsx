export const GeneratePaymentCode = () => {
  const timestamp = Date.now().toString(); // Lấy timestamp hiện tại
  return `PAY-${timestamp}`;
};
