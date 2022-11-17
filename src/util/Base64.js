// const base64Encoded = (files = null) => {
//   if (!files) return;

//   Array.from(files).forEach(file => {
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function() {
//       let base64 = reader.result;
//       let arrBase64 = []
//       arrBase64 = base64.split(",")
//       console.log(arrBase64[1])
//       return arrBase64[1]
//     }
//   })
// }

// const base64Decoded = () => {

// }

// export const base64Files = { base64Encoded, base64Decoded }