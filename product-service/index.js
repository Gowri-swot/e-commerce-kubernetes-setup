const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 8080;
const Product = require("../database-service/Product");
const jwt = require("jsonwebtoken");
const amqp = require("amqplib");
const isAuthenticated = require("../isAuthenticated");
const { response } = require("express");
var order;

var channel, connection;

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}
connect();

app.use(express.json());

app.get('/product', isAuthenticated, async (req, res) => {
    const product_items = await Product.findAll();
    return res.json(product_items)
   
});


app.post("/product/buy", isAuthenticated, async (req, res) => {
    const { ids } = req.body;
    let products = []
    console.log(ids.length)
    for(let i=0; i < ids.length; i++) {
        const data = await (await Product.findByPk(ids[i])).get();
        if(data != null) {
            products.push(data)
            
        }
    }
    channel.sendToQueue(
        "ORDER",
        Buffer.from(
            JSON.stringify({
                products,
                userEmail: req.user.email,
            })
        )
    );
    channel.consume("PRODUCT", (data) => {
        order = JSON.parse(data.content);
    });
    return res.json(order);
});

app.post("/product/create", isAuthenticated, async (req, res) => {
    const { name, description, price } = req.body;
    
    const newProduct = new Product({
        name,
        description,
        price,
    });
    newProduct.save();
    return res.json(newProduct);
});


app.listen(PORT, () => {
    console.log(`Product-Service at ${PORT}`);
});
