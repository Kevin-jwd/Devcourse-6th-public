const express = require("express");
const router = express.Router();

let db = new Map();
let id = 1;

router.use(express.json());

// GET /users
router.get("/users", function (req, res) {
    const { userId } = req.body;
    const user = db.get(userId);

    // id가 db에 존재하는지 확인
    if (user) {
        res.status(201).json({
            userId: user.userId,
            name: user.name,
        });
    } else {
        res.status(404).json({
            message: "존재하지 않는 사용자입니다.",
        });
    }
});

// POST /login
router.post("/login", function (req, res) {
    const { userId, userPw } = req.body;
    let loginUser = {};

    db.forEach(function (user, id) {
        if (user.userId === userId) {
            loginUser = user;
        }
    });

    if (isExist(loginUser)) {
        if (loginUser.userPw === userPw) {
            res.status(200).json({
                message: `${loginUser.name}님 성공적으로 로그인 되었습니다.`,
            });
        } else {
            res.status(400).json({
                message: "비밀번호가 틀렸습니다.",
            });
        }
    } else {
        res.status(404).json({
            message: "존재하지 않는 ID입니다."
        })
    }
});

function isExist(obj) {
    if (Object.keys(obj).length) {
        return true;
    } else {
        return false;
    }
}

// POST /register
router.post("/register", function (req, res) {
    // 빈 객체 확인
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: "입력 값을 다시 한 번 확인해주세요.",
        });
    } else {
        const { userId } = req.body.userId;
        db.set(userId, req.body);
        let name = db.get(userId).name;
        res.status(201).json({
            message: `${name}님의 회원가입을 축하드립니다!`,
        });
    }
});

// DELETE /users/:id
router.delete("/users/:id", function (req, res) {
    const { userId } = req.body;
    const user = db.get(userId);

    if (user) {
        const name = user.name;
        res.status(200).json({
            message: `${name}님 다시 만날 날을 기약하겠습니다.`,
        });
    } else {
        res.status(404).json({
            message: "존재하지 않는 사용자입니다.",
        });
    }
});

module.exports = router;
