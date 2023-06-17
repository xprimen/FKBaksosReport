export const numberToString = (number) => {
  const number_string = number.toString(),
    divided = number_string.length % 3;
  let numbering = number_string.substr(0, divided),
    thousanf = number_string.substr(divided).match(/\d{3}/g);

  if (thousanf) {
    const separator = divided ? "." : "";
    numbering += separator + thousanf.join(".");
    return numbering;
  }

  return number;
};
