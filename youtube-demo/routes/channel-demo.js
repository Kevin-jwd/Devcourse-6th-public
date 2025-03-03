const express = require("express");
const router = express.Router();

router.use(express.json());

// Routes
// path: "/channels"
router
    .route("/")
    // 전체 채널 조회 : GET /channels
    .get((req, res) => {
        let { user_id } = req.body;
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
    })

    // 채널 등록 : POST /channels
    .post((req, res) => {
        const { name, user_id } = req.body;

        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "입력 값을 다시 한 번 확인해주세요.",
            });
        } else {
            const { name } = req.body;
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
    });

// path: "/channels/:id"
router
    .route("/:id")

    // 개별 채널 조회 : GET /channels/:id
    .get((req, res) => {
        const channelId = parseInt(req.params.id);
        const channel = db.get(channelId);
        if (channel) {
            res.status(200).json(channel);
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
    })

    // 채널(제목) 수정 : PUT /channels/:id
    .put((req, res) => {
        const channelId = parseInt(req.params.id);
        const channel = db.get(channelId);
        if (channel) {
            const oldChannelTitle = channel.channelTitle;
            const newChannelTitle = req.body.channelTitle;
            channel.channelTitle = newChannelTitle;
            db.set(channelId, channel);
            res.json({
                message: `채널명 ${oldChannelTitle}에서 ${newChannelTitle}로 성공적으로 변경되었습니다.`,
            });
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
    })

    // 개별 채널 삭제 : DELETE /channels/:id
    .delete((req, res) => {
        const channelId = parseInt(req.params.id);
        const channel = db.get(channelId);
        if (channel) {
            db.delete(channelId);
            res.status(200).json({
                message: `채널 ${channel.channelTitle}이 성공적으로 삭제되었습니다.`,
            });
        } else {
            res.status(404).json({
                message: "채널 정보를 찾을 수 없습니다.",
            });
        }
    });

module.exports = router;
