const express = require("express");
const db = require("../db/db");

const { products } = require("../db/schema");

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

module.exports = router;