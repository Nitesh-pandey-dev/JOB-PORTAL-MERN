const jwt = require('jsonwebtoken');
const token = async(user) => {
    const genToken = jwt.sign({email:user.email,id:user._id},process.env.JWT_SECRET);
    // console.log(genToken)
    return genToken;
}
module.exports = token;