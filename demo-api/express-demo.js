const express = require("express");
const app = express();

app.listen(1234);

const movies = [
    {
        id: 1,
        title: "Substance",
    },
    {
        id: 2,
        title: "IternalSunshine",
    },
    {
        id: 3,
        title: "Interstellar",
    },
    {
        id: 4,
        title: "2001 : A Space Odyssey",
    },
];

// 영화 전체 조회
app.get("/movies", function (req, res) {
    res.json(movies);
});

// 영화 개별 조회
app.get("/movies/:id", function (req, res) {
    let id = req.params.id;
    var findMovie = movies.find(element => id == element.id);
    if (findMovie) {
        res.json(findMovie);
    } else {
        res.status(404).send("404 ERROR!! 요청하신 영화가 존재하지 않습니다.");
    }
});