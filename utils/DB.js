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
    /** 
     * Creates an instance of Product. 
     * @param {*} data 
     * @memberof Product 
     */ 
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
   
    /** 
     * Turns the properties of this class instance into a plain JSON 
     * @return {*} JSON object with all Product properties 
     */ 
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
    /** 
     * Aliasing _id to id 
     * 
     * @readonly 
     * @return {string} ID string 
     * @memberof Product 
     */ 
    get id() { 
      return this._id; 
    } 
   
    /** 
     * Saves an entry to the database or updates it if necessary 
     * 
     * @return {Promise<Product>} the current instance of this class 
     * @memberof Product 
     */ 
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
   
    /** 
     * Returns all products stored in the database 
     * 
     * @static 
     * @return {Promise<Product[]>} Product instances 
     * @memberof Product 
     */ 
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
   
    /** 
     * Searches the database and returns the first instance that matches the passed 
     * properties 
     * 
     * @static 
     * @param {*} searchCondition an object of properties to look for 
     * @return {Promise<Product>} the instance of first match 
     * @memberof Product 
     */ 
    static async findOne(searchCondition) { 
      await connectDB(); 
      let product = null; 
      await ProductModel.find(searchCondition) 
        .then(result => { 
          if (result) product = result[0]; 
        }) 
        .catch(err => { 
          if (err) console.log('Error in FindOne Product'); 
          return null; 
        }); 
      return new Product(product); 
    } 
   
    /** 
     * Removes the first instance that matches the search parameters 
     * 
     * @static 
     * @param {*} searchCondition an object of properties to look for 
     * @return {Promise<undefined>} 
     * @memberof Product 
     */ 
    static async remove(searchCondition) { 
      await connectDB(); 
      await ProductModel.deleteOne(searchCondition) 
        .then(product => {}) 
        .catch(err => console.log('Error in Product Remove')); 
   
      return undefined; 
    } 
} 

Product.dbKey = 'products';
