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

// Routes
// path: "/channels"
router
    .route("/")
    // 전체 채널 조회 : GET /channels
    .get(
        body("user_id")
            .isInt()
            .withMessage("user_id는 필수이며 숫자여야 합니다."),
        validate,
        (req, res) => {
            const { user_id } = req.body;

            if (!user_id) {
                return res.status(400).json({
                    message: "id가 유효하지 않습니다.",
                });
            }
            conn.query(
                `SELECT * FROM channels WHERE user_id = ?`,
                [user_id],
                function (error, results) {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }
                    if (results.length) {
                        return res.status(200).json(results);
                    } else {
                        return res.status(404).json({
                            message: "채널이 존재하지 않습니다.",
                        });
                    }
                }
            );
        }
    )

    // 채널 등록 : POST /channels
    .post(
        [
            body("user_id")
                .isInt()
                .withMessage("user_id는 필수이며 숫자여야 합니다."),
            body("name")
                .notEmpty()
                .withMessage("name은 필수 입력값입니다.")
                .matches(/^[a-zA-Z가-힣\s]+$/)
                .withMessage("name은 한글, 영문자, 공백만 포함할 수 있습니다."),
            validate,
        ],
        (req, res) => {
            const { name, user_id } = req.body;

            conn.query(
                `INSERT INTO channels (name, user_id) VALUES (?, ?)`,
                [name, user_id],
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

// path: "/channels/:id"
router
    .route("/:id")

    // 개별 채널 조회 : GET /channels/:id
    .get(
        [
            param("id").notEmpty().withMessage("user_id는 필수 입력값입니다."),
            validate,
        ],
        (req, res) => {
            const channelId = parseInt(req.params.id);
            conn.query(
                `SELECT * FROM channels WHERE id = ?`,
                [channelId],
                function (error, results) {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }
                    if (results.length === 0) {
                        return res
                            .status(404)
                            .json({ message: "채널 정보를 찾을 수 없습니다." });
                    }
                    return res.status(200).json(results[0]);
                }
            );
        }
    )

    // 채널(제목) 수정 : PUT /channels/:id
    .put(
        [
            param("id").isInt().withMessage("id는 필수이며 숫자여야 합니다"),
            body("name")
                .notEmpty()
                .withMessage("name은 필수 입력값입니다.")
                .matches(/^[a-zA-Z가-힣\s]+$/)
                .withMessage("name은 한글, 영문자, 공백만 포함할 수 있습니다."),
            validate,
        ],
        (req, res) => {
            const newName = req.body.name;
            const id = parseInt(req.params.id);
            conn.query(
                "UPDATE channels SET name = ? WHERE id = ?",
                [newName, id],
                function (error, results) {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }
                    if (results.affectedRows === 0) {
                        return res.status(400).json({
                            message:
                                "변경할 채널을 찾을 수 없거나 수정할 내용이 없습니다.",
                        });
                    }
                    return res.status(200).json({
                        message: `채널명이 ${newName}로 성공적으로 변경되었습니다.`,
                    });
                }
            );
        }
    )

    // 개별 채널 삭제 : DELETE /channels/:id
    .delete(
        [
            param("id").isInt().withMessage("id는 필수이며 숫자여야 합니다"),
            validate,
        ],
        (req, res) => {
            const id = parseInt(req.params.id);
            conn.query(
                "DELETE FROM channels WHERE id = ?",
                [id],
                function (error, results) {
                    if (error) {
                        return res
                            .status(500)
                            .json({ message: "서버 오류가 발생했습니다." });
                    }
                    if (results.affectedRows === 0) {
                        return res.status(400).json({
                            message: "삭제할 채널을 찾을 수 없습니다.",
                        });
                    }
                    return res.status(200).json({
                        message: `채널이 성공적으로 삭제되었습니다.`,
                    });
                }
            );
        }
    );

module.exports = router;
