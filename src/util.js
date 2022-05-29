
export let formatter = new Intl.NumberFormat("en-US", {
  currency: "VND",
});
export  const convertBase64 = (file) => {
  return new Promise((resolve,rejected) =>{
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = () =>{
      resolve(fileReader.result)
    };
    fileReader.onerror = error =>{
      rejected(error)
    }
  })
}
