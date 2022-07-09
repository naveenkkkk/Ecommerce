import mongoose from "mongoose";
import { Schema, ObjectId } from "mongoose";

const ProductSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    price: {
        type: Schema.Types.Decimal128,
        default: 500,
        min: 500,
        max: 25000, 
        validate : {
            validator : Number.isInteger,
            message   : '{VALUE} is not an integer value'
        }
    },
    stock: {
        type: Boolean,
        default: false,
    }
});

const ProductModel = mongoose.model("Products", ProductSchema);

export default ProductModel;
