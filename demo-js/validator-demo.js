const express = require("express");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.json());

app.post(
    "/register",
    [
        // username 필드가 최소 3자 이상인지 확인
        body("username")
            .isLength({ min: 3 })
            .withMessage("이름은 최소 3자 이상이어야 합니다."),
        // email 필드가 이메일 형식인지 학인
        body("email").isEmail().withMessage("유효한 이메일 주소를 입력하세요."),
        // password 필드가 최소 6자 이상인지 확인
        body("password")
            .isLength({ min: 6 })
            .withMessage("비밀번호는 최소 6자 이상이어야 합니다."),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        res.json({ message: "회원가입 성공" });
    }
);

app.listen(1234, () => console.log("서버 실행 중..."));
