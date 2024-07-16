const addToCartModel = require("../../models/cartProduct")

const viewProduct = async (req,res)=>{
    try{
        const currentUser = req.userId 
        const allProduct = await addToCartModel.find({
            userId:currentUser
        }).populate("productId")
        res.json({
            data:allProduct,
            success:true,
            message:"all products in the cart",
            error:false
        })
    }
    catch(err){
        res.json({
            message : err.message || err  ,
            error : true,
            success : false,
        })
    }
}

module.exports = viewProduct