const express = require("express");
const app = express();

app.listen(1234);

// GET /
app.get("/", function (req, res) {
    res.send("Hello World");
});

// GET /products/1
app.get("/products/1", function (req, res) {
    res.json({
        title: "객체를 공부해보자",
        price: "20000",
        description: "객체에 대해 완벽히 이해해보세요.",
    });
});
