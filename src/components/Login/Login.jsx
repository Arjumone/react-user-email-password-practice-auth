import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { useRef, useState } from "react";


const Login = () => {
    const [regError,setRegError] =useState(' ');
    const [success,setSuccess] =useState(' ');
    const emailRef = useRef()

    const handleLogin = (e)=>{
        e.preventDefault()
        // console.log("submitted");
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);

        // reset error and success
        setRegError(' ')
        setSuccess(' ')

        // add validation
        signInWithEmailAndPassword(auth,email,password)
        .then(result=>{
            console.log(result.user);
            if(result.user.emailVerified){
                setSuccess("User logged in successfully")
            }
            else{
                alert("please verify your email address")
            }
        })
        .catch(error=>{
            console.log(error);
            setRegError(error)
        })

    }

    const handleForgetPassword=()=>{
        const email = emailRef.current.value
        if(!email){
            console.log("provide a email");
            return;
        }
        else if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email)){
            console.log("write a valid email");
            return;
        }

        // send validation email
        sendPasswordResetEmail(auth,email)
        .then(()=>{
            alert("please check your email")
        })
        .catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
    <p className=" text-4xl font-bold mx-auto mt-3">Please Login</p>
      <form onSubmit={handleLogin} className="card-body">
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
          <input type="password" placeholder="Password" name="password" className="input input-bordered" required />
          <label className="label">
            <a onClick={handleForgetPassword} ref={emailRef} href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Login</button>
        </div>
      </form>
      {
        regError && <p>{regError}</p>
      }
      {
        success && <p>{success}</p>
      }
      <p className=" mx-auto mb-3">Already have an account?<Link to='/register' className="text-blue-600">Register</Link></p>
    </div>
  </div>
</div>
    );
};

export default Login;