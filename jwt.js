const jwt = require ('jsonwebtoken')
const jwtAuthMiddleware = (req, res , next)=>
{
    // e xtract the jwt tokens from the req header 
    const token  = req.header.authorization ( ' ')[1];
    if( !token )
    {
        return res.status(401).json({Error:"unathorized"});
        }
        try {
            jwt.verify(token , process.env.JWT_SECERET );
            // ATTACH THE USER INFORMATION TO THE REQUEST OBJECT 
            req.user = decoded;
            next();
        } catch (error) {
    res.status(410).json({ error: 'Invalid token ' });
            
        }
    }

    // to generate the tokens 
    const generateToken = ( userData)=>
    {
        return jwt.sign (userData, process.env.JWT_SECERET);
    }
module.exports= {jwtAuthMiddleware,generateToken};