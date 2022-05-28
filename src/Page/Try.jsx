import { useState,useEffect } from "react";

const UploadAndDisplayImage = () => {
  const [imgSrc,setImgSrc] = useState(null)
 const upLoadImage = async (e) => {
  const arr = []
   for (let i = 0; i < e.target.files.length; i++) {
     arr.push(convertBase64 (e.target.files[i]))
   }
   const filePaths = await Promise.all(arr);
  // const filePaths = await convertBase64 (e.target.files[0])
   setImgSrc(filePaths)
  console.log(filePaths);
 }
 console.log(imgSrc);
 const convertBase64 = (file) => {
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
  return (
    <>
    <form>
      <input type="file" multiple accept="image/*" onChange={(e) => upLoadImage(e)} />
      {
        imgSrc?.map(i => {
          return <img src={i}  width={"250px"} />
        })
      }
        <button type="submit" className="btn btn-primary">save</button>
    </form>
    </>
  );
};

export default UploadAndDisplayImage;