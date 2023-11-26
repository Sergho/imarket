const user = require('./models/User')

async function foo(){
    const data = await user.getUser(4)
    console.log(data)
}

try{
    foo()
} catch(e){
    console.log(e)
}