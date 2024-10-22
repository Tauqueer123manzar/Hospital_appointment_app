exports.GenerateToken =async(user, message, statusCode, res) => {
    const token =await user.generateJsonWebToken();
    console.log("Generated Token: ", token); 
    const cookieName = user.role === "Admin" ? "adminToken" : "patientToken";

    res.status(statusCode).cookie(cookieName, token,user, {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }).json({
        success: true,
        message,
        user,
        token ,
        role:user.role     
    });
};
