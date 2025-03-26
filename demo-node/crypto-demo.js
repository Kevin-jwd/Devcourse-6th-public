// crypto 모듈 불러오기
const crypto = require("crypto");

// 비밀번호
const password = "1111";

// 64바이트 길이의 랜덤한 salt(솔트) 생성 (base64로 변환)
const salt = crypto.randomBytes(64).toString("base64");

// PBKDF2 알고리즘을 사용하여 비밀번호 해싱
const hashedPassword = crypto
    .pbkdf2Sync(
        password, // 원본 비밀번호
        salt, // 솔트 값
        10000, // 반복 횟수 (반복 횟수가 높을수록 보안 강화)
        10, // 해시된 출력 값의 길이 (64바이트)
        "sha512" // 해싱 알고리즘 (SHA-512 사용)
    )
    .toString("base64"); // 해싱된 결과를 base64 문자열로 변환

// 해싱 결과 출력
console.log(hashedPassword);
