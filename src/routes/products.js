const express = require("express");
const db = require("../db/db");

const { products } = require("../db/schema");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async(req,res) =>{
    try{
        const entires= await db.select().from(products);
        return res.status(200).json(entires)
    }
    catch (err){
        return res.status(500).json({
            error: err.message || "Something went wrong!" 
        })
    }
})

router.get("/:id", async (req,res)=>{
    try{
        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id))

        if (!entry){
            return res.status(404).json({
                message: "Product not found"
            });
        }
        return res.status(200).json(entry);
    }
    catch(err){
            return res.status(500).json({
                error: err.message || "Something went wrong"
            })
    }
})

module.exports = router;