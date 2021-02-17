import jwt from "jsonwebtoken"

export const authControl = async (req, res) => {

    let accessToken = req.cookies.authcookie
    console.log("ACCESS TOKEN",accessToken)

    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        console.log("access token vide")
        return res.status(403).send()
    }

    let payload
    try{
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        console.log("SECRET TEST",process.env.ACCESS_TOKEN_SECRET)

        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
        console.log("PAYLOAD",payload)

        res.json({islogged:payload})
    }
    catch(e){
        //if an error occured return request unauthorized error
       
        console.log("Le token a expiré:",e)
        return res.status(401).send()
    }
}