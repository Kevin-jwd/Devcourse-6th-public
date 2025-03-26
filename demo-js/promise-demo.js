// Promise
let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("성공"), 3000);
});

// promise의 기본 메서드 : promise가 완료되면 호출해야하는 함수
promise.then(
    function (result) {
        console.log(result);
    },
    function (error) {
        console.log(error);
    }
);
