const express = require("express");
const app = express();

const port = 1313;

let db = new Map();
let id = 1;

app.listen(port, function () {
    console.log(`Server is listening on port ${port}`);
});

app.use(express.json());

// GET /users/:id
app.get("/users/:id", function (req, res) {
    const id = parseInt(req.params.id);
});

// POST /login
app.post("/login", function (req, res) {
    let user_id = db.get(id);
    res.status(201).json({
        message: `${user_id}님 환영합니다.`,
    });
});

// POST /register
app.post("/register", function (req, res) {
    db.set(id++, req.body);
    let user_id = db.get(id - 1).name;
    if (req.body == {}) {
        res.status(201).json({
            message: `${user_id}님의 회원가입을 축하드립니다!`,
        });
    } else {
        res.status(400).json({
            message: "400 ERROR! 존재하지 않는 사용자입니다. ",
        });
    }
});

// DELETE /users/:id
app.delete("/users/:id", function (req, res) {
    const id = parseInt(req.params.id);
    let user_id = db.get(id);
    res.status(201).json({
        message: `${user_id}님 다시 만날 날을 기약하겠습니다.`,
    });
});
