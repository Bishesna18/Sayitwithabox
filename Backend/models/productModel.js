import mongoose from 'mongoose';
const productSchema = new mongoose.Schema({
        id: { type: Number, required: true,unique:true, index: true},
        name: { type: String, required: true },
        image: { type: [String], required: true },
        category: { type: [String], required: true }, // Fixed incorrect data type
        description: { type: String,  default: "" }, // Added for detailed item descriptions
        tags: [String], // Added for AI-friendly features like keywords
        personalization_options: { type: Array, default: [] }, // Added for customization options
        occasion: { type: String }, // Added to categorize products by events
        new_price: { type: Number, required: true },
        old_price: { type: Number },
        date: { type: Date, default: Date.now },
        available: { type: Boolean, default: true }, // Fixed typo
        rating: { type: Number, default: 0 }, // Added for user feedback
        sold_count: { type: Number, default: 0 }, // Added for tracking popularity
        delivery_time: { type: String }, // Added for estimated delivery times
    });
    
    const Product = mongoose.model.product||mongoose.model('Product', productSchema);
export default Product