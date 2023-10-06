import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";

import { useState } from "react";
import { FaEye,FaEyeSlash } from "react-icons/fa";
import auth from "../../firebase/firebase.config";


const Register = () => {
    const [regError,setRegError] =useState(' ');
    const [success,setSuccess] =useState(' ');
    const [showPassword,setShowPassword]=useState(false)

    const handleRegister = (e)=>{
        e.preventDefault()
        // console.log("submitted");
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        // console.log(name,email,password);

        // reset error and success
        setRegError(' ')
        setSuccess(' ')

        if(password.length < 6){
            setRegError("Please password should be 6 characters")
            return
        }
        else if(! /[A-Z]/.test(password)){
            setRegError("Your password should one uppercase")
            return;
        }
        else if(!accepted){
            setRegError("Please accept our terms and condition")
            return
        }


        // create user
        createUserWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            setSuccess("user create successfully")

            // update profile
            updateProfile(result.user,{
                displayName:name,
            //    photoURL:""
            })
            .then(()=>{
                console.log("profile Updated");
            })
            .catch(error=>{
                console.log(error);
            })

            // send verification email
            sendEmailVerification(result.user)
            .then(()=>{
                alert("Please check your email and verify your account")
            })
            .catch(error=>{
                console.log(error);
            })
        })
        .catch(error=>{
            console.log(error.message);
            setRegError(error.message)
        })

    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <p className=" text-4xl font-bold mx-auto mt-3">Please Register</p>
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Your Name" name="name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="Your email" name="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <div className=" relative">
          <input type={showPassword ? "text":"password"} placeholder="Password" name="password" className="input input-bordered" required />
          <span onClick={()=>setShowPassword(!showPassword)} className="absolute -ml-8 mt-4">
            {
                showPassword? <FaEye></FaEye>
                :
                <FaEyeSlash></FaEyeSlash>
            }
          </span>
          </div>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className=" flex">
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="">Accept our <a className=" text-green-600" href="">Terms and Conditions</a></label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Register</button>
        </div>
      </form>
      {
        regError && <p>{regError}</p>
      }
      {
        success && <p>{success}</p>
      }
      <p className=" mx-auto mb-3">Already have an account?<Link to='/login'className="text-blue-600">Login</Link></p>
    </div>
  </div>
</div>
    );
};

export default Register;