const express = require('express');

const menuItem= require ('../module/menuSchema')
const router = express.Router ();
router .use(express.json());

//  order according to the menu card 
router.post ('/menu',async (req, res)=>{
try {
    const data = req.body;
    const order = new menuItem(data);
    const response = await order.save();
     console.log("✅ Person saved to DB");
    res.status(200).json({ message: "Person created", data: response });
}catch(error){
    console.error("❌ Error saving person:", error.message);
    res.status(500).json({ error: "Failed to create a order ", details: error.message });

}
})

router .get ( '/orders', async(req, res)=>{
    try{
        const findingOrders = await  menuItem.find();
        res.json(findingOrders);
         console.log("✅ Order found in  DB");
         res.status( 200).json(findingOrders);
    }
    catch (error) {
    res.status(404).json(error);
  }
})
 // updating the order if the person want to update the order
router .put ( '/:id', async ( req,res)=>{
    try {
        const menuId = req.params.id;
        const updateMenuData= req.body;
        const response= await menuItem.findByIdAndUpdate( menuId,updateMenuData,{
            new:true,
            runValidators:true,
        })
        if (! response)
        {
            return res.status( 404).json( {'error':'menu item not found'});
        }

        console.log("✅ data updated ");
         res.status(200).json(response);
        
    } catch (error) {
          console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports=router;