const express = require('express');
const app = express();
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose'); 
const Product = require('./models/productModel');

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes

app.get('/', (req,res)=> {
    res.send('hello Node API')
})

app.get('/blog', (req,res)=> {
    res.send('hello blog I am Ujjwal')
})

app.get('/products/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findbyId(id)
        res.status(200).json(product);
       } catch(error){
        
        res.status(500).json({ message: error.message });
       }
})

//to get data from db
app.get('/products', async(req,res)=> {
    try{
        const products = await Product.find({})
        res.status(200).json(products);
       } catch(error){
        console.log(error.message);
        res.status(500).json({ message: error.message });
       }
})

app.get('/product/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
       } catch(error){
        
        res.status(500).json({ message: error.message });
       }
});


app.post('/products',async(req,res) => {
   try{
    const product = await Product.create(req.body)
    res.status(200).json(product);
   } catch(error){
    console.log(error.message);
    res.status(500).json({ message: error.message });
   }
})

//update product
app.put('/product/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body);
        //we cannot find any product in the database
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
       } catch(error){
        
        res.status(500).json({ message: error.message });
       }
});

// delete a product
app.delete('/product/:id', async(req,res)=> {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        //we cannot find any product in the database
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(Product);
       } catch(error){
        res.status(500).json({ message: error.message });
       }
});

mongoose.set('strict', true);
mongoose.connect('mongodb+srv://ujjwal09:ujjwal69@ujjwalapi.ui869cr.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log('Node API app is running on port 3000')
    })
    
}).catch((error) => {
    console.log(error)
})
