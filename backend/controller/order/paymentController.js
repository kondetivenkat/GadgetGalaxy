// const stripe = require('../../config/stripe')
// const userModel = require('../../models/userModel')

// const paymentController = async(req,res)=>{
//     try{
//         const {cartItems} = req.body
        
//         const user = await userModel.findOne({_id:req.userId})
//         const params = {
//             submit_type : 'pay',
//             mode:'payment',
//             payment_method_types: ['card'],
//             billing_address_collection: 'auto',
//             shipping_options:[
//                 {
//                     shipping_rate:'shr_1PdYpYJ1I3wV0x2D1r8tZQkP'
//                 }
//             ],
//             customer_email: user.email,
//             metadata:{
//                 userId:req.userId
//             },
//             line_items:cartItems.map((item,index)=>{
//                 return{
//                     price_data:{
//                         currency: 'inr',
//                         product_data:{
//                             name:item.productId.productName,
//                             images:item.productId.productImage,
//                             metadata : {
//                                 productId : item.productId._id
//                             }
//                         },
//                         unit_amount: item.productId.sellingPrice * 100
//                     },
//                     adjustable_quantity :{
//                         enabled : true,
//                         minimum : 1,
//                     },
//                     quantity: item.quantity
//                 }
//             }),
            
//             success_url : 'http://localhost:3000/success',
//             cancel_url : 'http://localhost/3000/cancel',
//         }

//         const session = await stripe.checkout.sessions.create(params)
        
//         res.status(303).json(session)

//     }
//     catch (err) {
//         res.status(500).json({
//             message: err.message || "Internal Server Error",
//             error: true,
//             success: false
//         });
//     }
// }

// module.exports = paymentController



const stripe = require('../../config/stripe');
const userModel = require('../../models/userModel');

const paymentController = async (req, res) => {
  try {
    const { cartItems } = req.body;

    const user = await userModel.findOne({ _id: req.userId });
    const params = {
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        {
          shipping_rate: 'shr_1PdYpYJ1I3wV0x2D1r8tZQkP'
        }
      ],
      customer_email: user.email,
      metadata: {
        userId: req.userId
      },
      line_items: cartItems.map((item, index) => {
        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: item.productId.productName,
              images: item.productId.productImage ? item.productId.productImage.filter(image => image) : [],
              metadata: {
                productId: item.productId._id
              }
            },
            unit_amount: item.productId.sellingPrice * 100
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity
        }
      }),
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    };

    const session = await stripe.checkout.sessions.create(params);

    res.status(303).json(session);

  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal Server Error",
      error: true,
      success: false
    });
  }
};

module.exports = paymentController;
