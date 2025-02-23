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
    const user = db.get(id);
    // id가 db에 존재하는지 확인
    if (user == undefined) {
        res.status(404).json({
            message: "존재하지 않는 사용자입니다.",
        });
    } else {
        res.status(201).json({
            user_id: user.user_id,
            name: user.name,
        });
    }
});

// POST /login
app.post("/login", function (req, res) {
    const { user_id, user_pw } = req.body;
    const loginUser = db.find((user) => user.user_id === user_id);

    if (loginUser) {
        console.log("일치하는 ID 확인");
        if (loginUser.user_pw === user_pw) {
            console.log("일치하는 PW 확인");
        } else {
            console.log("PW 불일치");
        }
    } else {
        console.log("일치하는 ID 없음");
    }
});

// POST /register
app.post("/register", function (req, res) {
    // 빈 객체 확인
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: "입력 값을 다시 한 번 확인해주세요.",
        });
    } else {
        db.set(id++, req.body);
        let user_id = db.get(id - 1).name;
        res.status(201).json({
            message: `${user_id}님의 회원가입을 축하드립니다!`,
        });
    }
});

// DELETE /users/:id
app.delete("/users/:id", function (req, res) {
    const id = parseInt(req.params.id);
    const user = db.get(id);
    if (user == undefined) {
        res.status(404).json({
            message: "존재하지 않는 사용자입니다.",
        });
    } else {
        const user_id = user.user_id;
        res.status(200).json({
            message: `${user_id}님 다시 만날 날을 기약하겠습니다.`,
        });
    }
});
