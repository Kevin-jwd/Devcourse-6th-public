let jwt = require('jsonwebtoken');
let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
console.log(token)

let decoded = jwt.verify(token, 'shhhhh');
console.log(decoded)

let wrong_decoded = jwt.verify(token, 'wrong_key');
console.log(wrong_decoded)