fetch('https://jsonplaceholder.typicode.com/users')
    .then(variablefetch=>variablefetch.text())
.then(body=>console.log(body))