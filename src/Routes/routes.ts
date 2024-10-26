import { Hono } from "hono";
import { loginAuth } from "../auth/Login/login.js";
import { signupAuth } from "../auth/Signup/Signup.js";
import verifyEmail from "../auth/verify/verifyemail.js";
import { resetPassword } from "../auth/resetpasword/resetpassword.js";
import { requestOtp } from "../auth/requestotp/requestotp.js";

const authroute = new Hono()
authroute.get("/", (c) => c.text("hello Auth Route"))
authroute.notFound((c) => {
    return c.json(
        {
            message: c.req.url
        },
        404
    )
})
authroute.post('/login', loginAuth)
authroute.post('/resetpassword', resetPassword)
authroute.post('/resetpassotp', requestOtp)
authroute.post('/requestotp', requestOtp)
authroute.post('/signup', signupAuth)
authroute.post('/verifyemail', verifyEmail)
export default authroute
