const express = require("express");
const db = require("../db/db");

const { products } = require("../db/schema");
const { eq } = require("drizzle-orm");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const entires = await db.select().from(products);
        return res.status(200).json(entires)
    }
    catch (err) {
        return res.status(500).json({
            error: err.message || "Something went wrong!"
        })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id))

        if (!entry) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        return res.status(200).json(entry);
    }
    catch (err) {
        return res.status(500).json({
            error: err.message || "Something went wrong"
        })
    }
})

router.post("/", async (req, res) => {
    try {
        const { name, price, inStock } = req.body;
        if (!name) {
            return res.status(404).json({
                message: "The name field is required!"
            })
        }

        if (!price) {
            return res.status(404).json({
                message: "The name price is required!"
            })
        }

        if (inStock === undefined) {
            return res.status(404).json({
                message: "The inStock field is required!"
            })
        }

        await db.insert(products).values({
            name,
            price,
            inStock,
        })

        return res.status(201).json({
            message: "Product created successfully!"
        })
    }
    catch (err) {
        return res.status(500).json({
            error: err.message || "Something went wrong"
        })
    }
})

router.put("/:id", async (req, res) => {
    try {
        const { name, price, inStock } = req.body;

        const [entry] = await db.select().from(products).where(eq(products.id, +req.params.id))

        if (!entry) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        await db.update(products).set({ name, price, inStock }).where(eq(products.id, +req.params.id))

        return res.status(200).json({
            message: "Product updated succesfully!",
        })

    }
    catch (err) {

         return res.status(500).json({
            error: err.message || "Something went wrong"
        })

    }
})


module.exports = router;