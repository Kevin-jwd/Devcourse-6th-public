// async - await : Promise 객체를 좀 더 쉽고 편하게
// await은 async 함수 안에서만 동작

async function f() {
    let startTime = Date.now(); // 시작 시간

    // 1번째 promise 객체
    let promise1 = new Promise(function (resolve, result) {
        setTimeout(() => resolve("첫 번째 쿼리"), 2000);
    });
    let result1 = await promise1;
    console.log(`${result1} - 실행 시간: ${Date.now() - startTime}ms`);

    // 2번째 promise 객체
    let promise2 = new Promise(function (resolve, result) {
        setTimeout(() => resolve("두 번째 쿼리"), 2000);
    });
    let result2 = await promise2;
    console.log(`${result2} - 실행 시간: ${Date.now() - startTime}ms`);

    // 3번째 promise 객체
    let promise3 = new Promise(function (resolve, result) {
        setTimeout(() => resolve("세 번째 쿼리"), 2000);
    });
    let result3 = await promise3;
    console.log(`${result3} - 실행 시간: ${Date.now() - startTime}ms`);
}

f();

// f().then(
//     function (result) {
//         console.log("result : ", result);
//     },
//     function (error) {
//         console.log("error : ", error);
//     }
// );
