const resp = (
  success: boolean,
  message: any,
  message_en?: any,
  message_th?: any
) => {
  return {
    success: success ? "success" : "error",
    message: message,
    message_en: message_en,
    message_th: message_th,
  };
};

export default resp;
