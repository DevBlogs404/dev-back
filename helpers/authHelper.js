const bcrypt = require('bcrypt')

exports.hashPass = async (password)=>{
    try {
    const saltRounds = 10;
    const hashedPass = await bcrypt.hash(password,saltRounds)
    return hashedPass
    } catch (error) {
        console.log(error);
    }
}

exports.comparePass = async (password,hashedPass)=>{
    return  await bcrypt.compare(password,hashedPass)
}