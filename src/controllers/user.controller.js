export const connexion = async (req, res) => {
    

    let accessToken = req.cookies.authcookie
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    const resultAccount = await GetAccount( payload.email );

    if(resultAccount.length == 1){

       
        const firstname = resultAccount[0].nom
        const lastname = resultAccount[0].prenom
        console.log("GET ACCOUNT OK: nom: ",firstname," prenom: ",lastname)
        res.json({firstname:firstname,lastname:lastname});

    }else{
        console.log("ERREUR PLUS D4UN COMPTE A 2TAIT TORUV2")
    }
}