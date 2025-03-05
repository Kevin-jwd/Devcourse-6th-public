let jwt = require("jsonwebtoken");
let env = require("dotenv");

env.config();

let token = jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY);
console.log(token);

let decoded = jwt.verify(token, process.env.PRIVATE_KEY);
console.log(decoded);

try {
    let wrong_decoded = jwt.verify(token, "wrong_key");
    console.log(wrong_decoded);
} catch (err) {
    console.log("에러 발생: ", err.message);
}
