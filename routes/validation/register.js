import Validator from 'validator';
import isEmpty from 'is-empty';

function validateRegisterInput(data) {
    let errors={};
    //convert empty fields to an ampt string so we can use validator functions
    data.name = !isEmpty(data.name)?data.name:"";
    data.email = !isEmpty(data.email)?data.email:"";
    data.password = !isEmpty(data.password)?data.password:"";
    data.password2 = !isEmpty(data.password2)?data.password2:"";

    //Name checks
    if(Validator.isEmpty(data.name)) {
        errors.name ="Name is required";
    }

    //Email checks
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    } else if(!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    //Password checks
    if(Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    } 
    else if(Validator.isEmpty(data.password2)) {
        errors.password = "Confirm Password field is required";
    } 
    else if(!Validator.isLength(data.password,{min:6, max:30})) {
        errors.password = "Password must be atleast 6 characters";
    }
    else if(!Validator.equals(data.password, data.password2)) {
        errors.password = "Passwords must match";
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
};
export default validateRegisterInput;