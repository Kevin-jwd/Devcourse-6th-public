const express = require("express");
const app = express();

// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();

// jwt 모듈
const jwt = require("jsonwebtoken");

app.listen(process.env.PORT);

// GET + "/jwt" : 토큰 발급
app.get("/jwt", function (req, res) {
    let token = jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY);

    res.cookie("jwt", token, {
        httpOnly: true,
    });
    res.send("토큰 발급 완료");
});

// GET + "/jwt/decoded" : 토큰 검증
app.get("/jwt/decoded", function (req, res) {
    let received_jwt = req.headers["authorization"];
    let decoded = jwt.verify(received_jwt, process.env.PRIVATE_KEY);
    res.send(decoded);
});
