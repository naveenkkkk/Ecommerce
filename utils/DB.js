import mongoose from "mongoose";

import { Database_URL } from "./Config";
import ProductModel from "@/models/ProductSchema";

const connectDB = async () => {
    if (mongoose.connection.readyState == 0) { 
        await mongoose 
          .connect(Database_URL) 
          .then(() => console.log('Database Connected!')) 
          .catch(err => {
            if (err) console.log(`Error in connecting DB: ${err}`); 
          }); 
      } 
};

export class Product {

    constructor(data) { 
      if (!data._id) { 
        data._id = mongoose.Types.ObjectId(); 
      } 
      this._id = data._id; 
      this.name = data.name; 
      this.description = data.description; 
      this.imageUrl = data.imageUrl;
      this.price = data.price; 
      this.stock = data.stock; 
    } 
   
    toJson() { 
      return { 
        _id: this._id,
        name: this.name,
        description: this.description,
        imageUrl: this.imageUrl,
        price: this.price,
        stock: this.stock, 
      }; 
    } 
    
    get id() { 
      return this._id; 
    } 
   
    async save() { 
      await connectDB(); 
      ProductModel.findById(this._id, (err, docs) => { 
        if (!docs) { 
          const product = new ProductModel(this.toJson()); 
          product 
            .save() 
            .then(product => {}) 
            .catch(err => console.log('Error in saving document')); 
        } else { 
            ProductModel.findOneAndUpdate({ _id: docs._id }, this.toJson()) 
            .then(product => {}) 
            .catch(err => console.log('Error in Saving Document ')); 
        } 
      }); 
      return this; 
    } 

    static async find() { 
      await connectDB(); 
      const arr = []; 
      await ProductModel.find().then(products => { 
        products.map(product => { 
          arr.push(new Product(product)); 
        }); 
      }); 
      return arr; 
    } 
   
    static async findOne(searchCondition) { 
      await connectDB(); 
      let product = null; 
      await ProductModel.find(searchCondition) 
        .then(result => { 
          if (result) product = result[0]; 
        }) 
        .catch(err => { 
          if (err) console.log(`Error in FindOne Product: ${err}`); 
          return null; 
        }); 
      return new Product(product); 
    } 

    static async remove(searchCondition) { 
      await connectDB(); 
      await ProductModel.deleteOne(searchCondition) 
        .then(product => {}) 
        .catch(err => console.log('Error in Product Remove')); 
   
      return undefined; 
    } 
} 

Product.dbKey = 'products';
