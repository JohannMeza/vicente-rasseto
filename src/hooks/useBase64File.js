export const useBase64Encoded = () => {
  const encodedFileBase64 = (data, setData, e) => {
    let { files, name } = e.target;

    Array.from(files).forEach(file => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        let base64 = reader.result;
        let arrBase64 = []
        arrBase64 = base64.split(",")
        setData({ ...data, [name]: arrBase64[1] })
      }
    })
  }

  return { encodedFileBase64 }
}

export const base64Decoded = () => {

}


// const decodeFileBase64 = (base64String) => {
//   return decodeURIComponent(
//     atob(base64String)
//     .split("")
//     .map(function (c) {
//       return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
//     }).join("")
//   )
// } 