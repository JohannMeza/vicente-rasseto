export default function ValidateData(data, errors, setErrors) {
  let temp = { ...errors };
  
  for (let value in data) {
    if (data[value] === "") {
      temp = {
        ...temp,
        [value]: `Este Campo es Requerido!`
      }
    } else {
      temp = {
        ...temp,
        [value]: null
      }
    }
  }
  setErrors(temp)
  return Object.values(temp).every((x) => x === "");
}
