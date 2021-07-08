import User from '../../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import expressJwt from 'express-jwt'
import validateRegisterInput from "../validation/register.js";

const signup = ((req,res) => {
    //Form Validation
    const {errors, isValid} = validateRegisterInput(req.body);

    //Check validation
    if(!isValid) {
        let user={name:'', email:'', password:'', errors:''};
        user.errors=errors[Object.keys(errors)[0]];
        return res.status(422).json(user);   
    }

    User.findOne({email:req.body.email})
        .then(user=>{
            if(user) {
                return res.status(400).json({email: "Email already exists"});
            } else {
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                });
                // Hash Password before saving in database
                bcrypt.genSalt(10, (err,salt) => {
                    bcrypt.hash(newUser.password, salt, (err,hash)=>{
                        if(err) {
                            return res.status(400).json({
                                error: errorHandler.getErrorMessage(err)
                            })
                        }
                        newUser.password=hash;
                        newUser
                            .save()
                            .then(user=>res.json(user))
                            .catch(err=>console.log(err));
                    });
                });
            }
        });
})
const signin = ((req, res) => {
    //Form validation
    let {error, isValid} = validateLoginInput(req.body);
    if(!isValid) {
        
        // console.log(error);
        return res.status(400).json({
            success: false,
            error: error[Object.keys(error)[0]]
        });          
    }
    User.findOne({email: req.body.email})
    .then(user=>{
        //Check if user exists
        if(!user) {
            return res.status(404).json({error: "Email not found"});
        }
        //Check password
        bcrypt.compare(req.body.password,user.password)
        .then(isMatch=>{
            if(isMatch) {
                //User matched
                //Creeate JWT paylod
                const payload = {
                    _id: user._id,
                };
                //Sign token
                const token=jwt.sign(
                    payload,
                    process.env.JWT_KEY
                )
                res.cookie("t", token, {expiresIn: new Date()+9999});
                return res.json({
                    success:true,
                    token: token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email
                    }
                })
                
            } else {
                return res.status(400).json({
                    error: "Password incorrect"
                })
            }
        }).catch(err=>console.log(err))
    }).catch(err=>console.log(err))
});

const signout = (req,res)=>{
    res.clearCookie("t");
    return res.status('200').json({
        message: "signed out"
    })
}

const requireSignin = expressJwt({
    secret: 'abced128989',
    userProperty: 'auth',
    algorithms: ['sha1', 'RS256', 'HS256'],
})

const hasAuthorization = (req, res, next) => {
    const authorized= req.profile && req.auth && req.profile._id == req.auth._id
    if(!authorized) {
        return res.status('403').json({
            error: "User not authorized"
        })
    }
    next()
}
export default {
    signup,
    signin,
    signout,
    requireSignin,
    hasAuthorization
}