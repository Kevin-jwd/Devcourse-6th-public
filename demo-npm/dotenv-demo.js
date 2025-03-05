const express = require("express");
const app = express();

const env = require("dotenv");

env.config();

app.listen(process.env.PORT, () => {
    console.log(`서버가 ${process.env.PORT} 실행 중입니다.`);
});
