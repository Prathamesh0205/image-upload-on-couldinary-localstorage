const Product=require("../models/Product");
const {StatusCodes}=require("http-status-codes");
const customError=require("../errors");
const path=require('path');
const { STATUS_CODES } = require("http");
const cloudinary=require('cloudinary').v2
const fs=require('fs');

const uploadProductImageLocal=async (req,res)=>{

  if(!req.files)
  {

    throw new customError.BadRequestError("No file uploaded")
  }

    let productImage=req.files.image;
    if(!productImage.mimetype.startsWith('image'))
    {
        throw new customError.BadRequestError('Please upload image');
    }
    const maxsize=1024 *1024;
    if(productImage.size>maxsize)
    {
        throw new customError.BadRequestError('Please upload image smaller than 1KB')
    }
    
    const imagePath=path.join(__dirname,"../public/uploads/"+`${productImage.name}`);

    await productImage.mv(imagePath);
   return res.status(StatusCodes.OK).json({image:{src:`/uploads/${productImage.name}`}})
}




const uploadProductImage=async(req,res)=>{

    const result=await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,
        folder:'file-upload'
    })
   fs.unlinkSync(req.files.image.tempFilePath)
    res.status(StatusCodes.OK).json({image:{src:result.secure_url}})
}







module.exports={uploadProductImage}