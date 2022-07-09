import Cors from "cors";
import nextConnect from "next-connect";

import { Product } from "@/utils/DB";
import initMiddleware from "@/utils/init-middleware";
import { makeResponse, status, message } from "@/utils/response";


const cors = initMiddleware(
    Cors({
        methods: ["GET"]
    })
);

const apiRoute = nextConnect({
    onError: (err, req, res, next) => {
        res.status(500).end("Something broke!");
    },
    onNoMatch: (req, res, next) => {
        res.status(404).end("Page is not found");
    },
})
    .get(async (req, res) => {
        try {
            await cors(req, res);

            const products = await Product.find();

            return makeResponse(res, status.OK, message.PRODUCT_FETCHED, products);
        } catch (e) {
            return makeResponse(res, status.INTERNAL_SERVER_ERROR, message.ERROR);
        }

    });

export default apiRoute;