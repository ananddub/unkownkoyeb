import * as jwt from 'hono/jwt'
import moment from 'moment'
interface Props {

    user: string,
    role: string,
    exp?: any,
    createdAt?: any
}
interface Token {
    refreshToken: string,
    accessToken: string
}
// const refexpire = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
// const accexpire = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 5


export async function genrateToken(props: Props) {
    const refpayload: any = props
    const accpayload: any = props
    const refexpire = Date.now() + (1000 * 60 * 5)
    const accexpire = Date.now() + (1000 * 60 * 60 * 24 * 30)
    refpayload.exp = refexpire
    refpayload.createdAt = moment().format()
    accpayload.exp = accexpire
    accpayload.createdAt = moment().format()
    const token: Token = {
        refreshToken: await jwt.sign(refpayload, process.env.REFRESH_TOKEN ?? 'test'),
        accessToken: await jwt.sign(accpayload, process.env.ACCESS_TOKEN ?? 'test')
    }
    return token
}

export async function genrateRefershToken(token: string) {
    try {
        const accesToken: any = jwt.verify(token, process.env.ACCESS_TOKEN ?? 'test')
        const refexpire = Date.now() + (1000 * 60 * 5)
        accesToken.exp = refexpire
        return {
            refreshToken: await jwt.sign(accesToken, process.env.REFRESH_TOKEN ?? 'test'),
            accessToken: token
        }
    } catch (e) {
        return {
            refreshToken: "",
            accessToken: ""
        }
    }
}

export async function genrateAccessToken(token: string) {
    try {
        const accexpire = Date.now() + (1000 * 60 * 60 * 24 * 30)
        const reftoken: any = jwt.verify(token, process.env.REFRESH_TOKEN ?? 'test')
        reftoken.exp = accexpire
        return {
            accessToken: await jwt.sign(reftoken, process.env.ACCESS_TOKEN ?? 'test'),
            refreshToken: token
        }
    } catch (e) {
        return {
            refreshToken: "",
            accessToken: ""
        }
    }
}

export async function verifyToken(token: string) {
    try {
        const accesstoken = await jwt.verify(token, process.env.REFRESH_TOKEN ?? 'test')
        const exp = accesstoken.exp ?? 0
        if (exp === 0) return false;
        else if (Date.now() > exp) return false
        return true
    } catch (e) {
        return false
    }
}




