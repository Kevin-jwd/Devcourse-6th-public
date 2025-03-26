// Promise - Chaining
let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve("성공"), 3000);
}).then(
    function (result) {
        console.log(result);
        return result + "!!!!!"
    },
    function (error) {
        console.log(error);
    }
).then(
    function (result) {
        console.log(result);
        return result + "!!!!!"
    },
    function (error) {
        console.log(error);
    }
).then(
    function (result) {
        console.log(result);
        return result + "!!!!!"
    },
    function (error) {
        console.log(error);
    }
);
