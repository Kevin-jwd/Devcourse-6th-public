// 서버 객체 생성
const express = require("express");
const app = express();

// 포트 1234에 서버 실행
app.listen(1234);

// youtuber 객체 생성
let youtuber1 = {
    channelTitle: "육식맨",
    subs: "130만명",
    videoNum: "289개",
};

let youtuber2 = {
    channelTitle: "침착맨",
    subs: "227만명",
    videoNum: "6600개",
};

let youtuber3 = {
    channelTitle: "김진짜",
    subs: "83만명",
    videoNum: "600개",
};

let db = new Map();
let id = 1;

db.set(id++, youtuber1);
db.set(id++, youtuber2);
db.set(id++, youtuber3);

// GET
app.get("/youtubers/:id", function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const youtuber = db.get(id);

    if (youtuber == undefined) {
        res.status(404).json({
            message: "404 ERROR! 존재하지 않는 유튜버입니다.",
        });
    } else {
        res.json(youtuber);
    }
});

// GET
app.get("/youtubers", function (req, res) {
    var jsonObject = {};
    if (db.size !== 0) {
        db.forEach(function (youtuber, key) {
            jsonObject[key] = youtuber;
        });
        res.json(jsonObject);
    } else {
        res.status(404).json({
            message: "404 ERROR! 조회할 유튜버가 없습니다.",
        });
    }
});

// POST
app.use(express.json());
app.post("/youtuber", function (req, res) {
    db.set(id++, req.body);
    res.json({
        message: `${
            db.get(id - 1).channelTitle
        }님, Youtube 채널 개설을 축하드립니다!`,
    });
});

// DELETE
app.delete("/youtubers/:id", function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const youtuber = db.get(id);

    if (youtuber == undefined) {
        res.status(404).json({
            message: "404 ERROR! 존재하지 않는 유튜버입니다.",
        });
    } else {
        res.json({
            message: `${youtuber.channelTitle}님, 다시 만날 날을 기약하겠습니다!`,
        });
    }
    db.delete(id);
});

// DELETE
app.delete("/youtubers", function (req, res) {
    var message = "";
    if (db.size >= 1) {
        db.clear();
        res.json({
            message: "전체 유튜버가 삭제되었습니다.",
        });
    } else {
        res.status(404).json({
            message: "404 ERROR! 삭제할 유튜버가 없습니다.",
        });
    }
});

// PUT
app.put("/youtubers/:id", function (req, res) {
    let { id } = req.params;
    id = parseInt(id);
    const youtuber = db.get(id);

    var message = "";

    if (youtuber == undefined) {
        res.status(404).json({
            message: "404 ERROR! 존재하지 않는 유튜버입니다.",
        });
    } else {
        const previous_channelTitle = youtuber.channelTitle;
        const modified_channelTitle = req.body.channelTitle;

        youtuber.channelTitle = modified_channelTitle;
        res.json(
            `채널명 ${previous_channelTitle}에서 ${modified_channelTitle}으로 성공적으로 변경되었습니다.`
        );
    }
});
