// async - await : Promise 객체를 좀 더 쉽고 편하게

async function f() {
    return 7;  // Promise 객체 반환
}

f().then(
    function(result) {
        console.log("result : ", result)
    }, 
    function(error) {
        console.log("error : ", error)
    }
)