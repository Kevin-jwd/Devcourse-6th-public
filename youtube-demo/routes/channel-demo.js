const express = require("express");
const router = express.Router();

router.use(express.json());

// Declare Map object as database
let db = new Map();

// Declare id as auto increment
let id = 1;

// Routes
// path: "/channels"
router
    .route("/")

    // 전체 채널 조회 : GET /channels
    .get((req, res) => {
        if (db.size) {
            let jsonObject = {};
            db.forEach(function (channel, key) {
                jsonObject[key] = channel;
            });
            res.status(200).json(jsonObject);
        } else {
            res.status(404).json({
                message: "조회할 채널이 존재하지 않습니다.",
            });
        }
    })

    // 채널 등록 : POST /channels
    .post((req, res) => {
        if (req.body.channelTitle) {
            db.set(id++, req.body);
            res.status(201).json({
                message: `${
                    db.get(id - 1).channelTitle
                } 채널이 성공적으로 생성되었습니다.`,
            });
        } else {
            res.status(400).json({
                message: "요청 값이 유효하지 않습니다.",
            });
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
