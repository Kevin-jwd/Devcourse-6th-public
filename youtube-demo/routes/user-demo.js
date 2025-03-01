const express = require("express");
const mysql = require("mysql2");
const router = express.Router();

router.use(express.json());

let db = new Map();

// 데이터베이스와 connection(conn) 생성
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Youtube",
});

// 사용자 조회 (GET /users)
router.get("/users", (req, res) => {
    const { email } = req.body;

    conn.query(
        `SELECT * FROM users WHERE users.email = ?`,
        [email],
        function (error, results) {
            if (results.length != 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({
                    message: "존재하지 않는 사용자입니다.",
                });
            }
        }
    );
});

// 로그인 (POST /login)
router.post("/login", (req, res) => {
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
            message: "존재하지 않는 ID입니다.",
        });
    }
});

// 회원가입 (POST /register)
router.post("/register", (req, res) => {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({
            message: "입력 값을 다시 한 번 확인해주세요.",
        });
    } else {
        const { email, name, password, contact } = req.body;
        conn.query(
            `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`,
            [email, name, password, contact],
            function (err, results) {
                res.status(201).json(results);
            }
        );
    }
});

// 회원 삭제 (DELETE /users/)
router.delete("/users/", (req, res) => {
    const { email } = req.body;
    conn.query(
        `DELETE FROM users WHERE email = ?`,
        [email],
        function (err, results) {
            res.status(200).json(results);
        }
    );

    if (user) {
        const name = user.name;
        db.delete(userId);
        res.status(200).json({
            message: `${name}님 다시 만날 날을 기약하겠습니다.`,
        });
    } else {
        res.status(404).json({
            message: "존재하지 않는 사용자입니다.",
        });
    }
});

// 존재 여부 확인 함수
function isExist(obj) {
    if (Object.keys(obj).length) {
        return true;
    } else {
        return false;
    }
}

module.exports = router;
