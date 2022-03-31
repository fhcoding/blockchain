export const transactionRequestValidator = (body: any) => {
  let valid = false;
  if (body) {
    const { recipient, value } = body;
    if (recipient && value && parseFloat(value)) {
      valid = true;
    }
  }
  return valid;
};
