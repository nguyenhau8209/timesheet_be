export const handleReturn = (error, code, message, data) => {
  return {
    error: error,
    code: code,
    message: message,
    data,
  };
};
