const express = require("express");
const mysql = require("mysql2");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();

router.use(express.json());

// 데이터베이스와 connection(conn) 생성
const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Youtube",
});

const validate = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            message: "입력 값을 다시 한 번 확인해주세요.",
            errors: err.array(),
        });
    }
    next();
};

router
    .route("/users")
    // 사용자 개별 조회 (GET /users)
    .get(
        [
            body("email")
                .notEmpty()
                .withMessage("email은 필수 입력값입니다.")
                .isEmail()
                .withMessage("이메일 형식이 아닙니다."),
            validate,
        ],
        (req, res) => {
            const { email } = req.body;

            conn.query(
                `SELECT * FROM users WHERE users.email = ?`,
                [email],
                function (error, results) {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }
                    if (results.length != 0) {
                        return res.status(200).json(results);
                    } else {
                        return res.status(404).json({
                            message: "존재하지 않는 사용자입니다.",
                        });
                    }
                }
            );
        }
    )
    // 사용자 삭제 (DELETE /users)
    .delete(
        [
            body("email")
                .notEmpty()
                .withMessage("email은 필수 입력값입니다.")
                .isEmail()
                .withMessage("이메일 형식이 아닙니다."),
            validate,
        ],
        (req, res) => {
            const { email } = req.body;

            conn.query(
                `DELETE FROM users WHERE email = ?`,
                [email],
                (error, results) => {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }

                    if (results.affectedRows === 0) {
                        return res
                            .status(404)
                            .json({ message: "존재하지 않는 사용자입니다." });
                    }

                    return res.status(200).json({
                        message: "회원 정보 삭제가 완료되었습니다.",
                    });
                }
            );
        }
    );

// 로그인 (POST /login)
router.post(
    "/login",
    [
        body("email")
            .notEmpty()
            .withMessage("email은 필수 입력값입니다.")
            .isEmail()
            .withMessage("이메일 형식이 아닙니다."),
        body("password")
            .notEmpty()
            .withMessage("비밀번호는 필수 입력값입니다."),
    ],
    validate,
    (req, res) => {
        const { email, password } = req.body;

        conn.query(
            `SELECT * FROM users WHERE users.email = ?`,
            [email],
            function (error, results) {
                if (error) {
                    return res
                        .status(500)
                        .json({ message: "서버 오류가 발생했습니다." });
                }
                if (results.length !== 0 && results[0].password === password) {
                    return res.status(200).json({
                        message: `${results[0].name}님 성공적으로 로그인되었습니다.`,
                    });
                } else if (results.length === 0) {
                    return res.status(404).json({
                        message: "존재하지 않는 사용자입니다.",
                    });
                } else {
                    return res.status(400).json({
                        message: "비밀번호가 틀렸습니다.",
                    });
                }
            }
        );
    }
);

// 회원가입 (POST /register)
router.post(
    "/register",
    [
        body("email")
            .notEmpty()
            .withMessage("email은 필수 입력값입니다.")
            .isEmail()
            .withMessage("이메일 형식이 아닙니다."),
        body("name")
            .notEmpty()
            .withMessage("name은 필수 입력값입니다.")
            .isString()
            .withMessage("이름은 문자열이어야 합니다."),
        body("password")
            .notEmpty()
            .withMessage("비밀번호는 필수 입력값입니다."),
        body("contact")
            .notEmpty()
            .withMessage("연락처는 필수 입력값입니다.")
            .isString()
            .withMessage("연락처는 문자열이어야 합니다."),
    ],
    validate,
    (req, res) => {
        const { email, name, password, contact } = req.body;
        conn.query(
            `INSERT INTO users (email, name, password, contact) VALUES (?,?,?,?)`,
            [email, name, password, contact],
            function (error, results) {
                if (error) {
                    return res
                        .status(500)
                        .json({ message: "서버 오류가 발생했습니다." });
                }
                return res.status(201).json(results);
            }
        );
    }
);

module.exports = router;
