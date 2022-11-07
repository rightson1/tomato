import Tomato from "../../../models/Tomato";
import db from "../../../models/db";

export default async function handler(req, res) {
    await db();

    const { method } = req;
    if (method === "GET") {
        const { search } = req.query;
        try {
            if (search) {
                const tomatoes = await Tomato.find({
                    $or: [
                        { causes: { $regex: search, $options: "i" } },
                        { diseases: { $regex: search, $options: "i" } },
                        { causes: search },
                        { causes: search.toLowerCase() },
                        { causes: search.toUpperCase() },
                        { causes: search.charAt(0).toUpperCase() + search.slice(1) },
                        { diseases: search },
                        { diseases: search.toLowerCase() },
                        { diseases: search.toUpperCase() },
                    ],
                });
                res.status(200).json(tomatoes);
            } else {
                const tomatoes = await Tomato.find({});
                res.status(200).json(tomatoes);
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }
    if (method === "POST") {
        try {
            const tomato = await Tomato.create(req.body);
            res.status(201).json(tomato);
        } catch (error) {
            console.log(error);
            res.status(400).json(error);
        }
    }
}