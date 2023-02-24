const readline = require("readline")

const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
read.question("Please enter your name:",(answer) => {
    console.log(`Hello ${answer}`);
    read.close()
})

// read.on("line", line=>{
//     console.log(`Receieved : ${line}`);
//     read.close()
// })