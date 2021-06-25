const express = require("express");
const app = express();
const PORT = process.env.PORT_ONE || 9090;
const Order = require("../database-service/Order");
const amqp = require("amqplib");
const isAuthenticated = require("../isAuthenticated");
const cors = require('cors');

app.use(cors());
var channel, connection;

app.use(express.json());

function createOrder(products, userEmail) {
    let total = 0;
    for (let t = 0; t < products.length; ++t) {
        total += products[t].price;
    }
    const newOrder = new Order({
        products,
        user: userEmail,
        total_price: total,
    });
    newOrder.save();
    return newOrder;
}

async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("ORDER");
}
connect().then(() => {
    channel.consume("ORDER", (data) => {
        console.log("Consuming ORDER service");
        const { products, userEmail } = JSON.parse(data.content);
        const newOrder = createOrder(products, userEmail);
        channel.ack(data);
        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );
    });
});


app.get('/order', isAuthenticated, async (req, res) => {
    const order_items = await Order.findAll();
    return res.json(order_items)
   
});

app.listen(PORT, () => {
    console.log(`Order-Service at ${PORT}`);
});
