import { async } from '@firebase/util'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth"
import { auth } from '../firebase'

const initialState = {
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

export const Auth = ({setActive, setUser}) => {
    // to manage the status of the user signed in or not
    const [state, setState] = useState(initialState)
    const [signUp, setSignUp] = useState(false)
    const navigate = useNavigate();
    const {email, password,lastName,confirmPassword} = state;

    const handleChange = (e) => {
         setState({...state, [e.target.name]: e.target.value})
    };

    const handleAuth= async(e)=>{
            e.preventDefault();
            if(!signUp){
            if(email && password){
                const {user} = await signInWithEmailAndPassword(auth,email,password);
                setUser(user);
                setActive("home");
            }else{
                return toast.error("All fields are required"); 
            }

            } else {
                if(password !== confirmPassword)
                return toast.error("Password don't match");
            
            if(lastName && email && password){
                const {user} = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                    );
                    await updateProfile(user,{displayName: `${lastName}`});
                    setActive("home")
            } else{
               return toast.error("All fields are required");  
            }
        }
           navigate("/")
    }

  return (
   <div className="container-fluid mb-4">
    <div className="container">
     <div className="col-12 text-center">
        <div className="text-center heading py-2">
            {!signUp ? "Sign-In" : "Sign-up"}
        </div>
        </div>  
       <div className="row h-100 justify-content-center align-items-center">
        <div className="col-10 col-md-8 col-lg-6">
            <form className = "row" onSubmit={handleAuth}>
                {signUp && (
                    <>
                  
                <div className="col-12 py-3">
                    <input 
                    type="text" 
                    className='form-control input-text-box'
                    placeholder='Enter Name'
                    name='lastName'
                    value={lastName}
                    onChange={handleChange}
                    />
                </div>
                  </>
                ) }
                <div className="col-12 py-3">
                    <input 
                    type="email" 
                    className='form-control input-text-box'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={handleChange}
                    />
                </div>
                <div className="col-12 py-3">
                    <input 
                    type="password"  
                    className='form-control input-text-box'
                    placeholder='password'
                    name='password'
                    value={password}
                    onChange={handleChange}
                    />
                </div>
                {signUp && (
                  <div className="col-12 py-3">
                  <input 
                  type="password" 
                  className='form-control input-text-box'
                  placeholder='confirm password'
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handleChange}
                  />
              </div>
                )}
                <div className="col-12 py-3 text-center">
                    <button 
                    className={`btn ${!signUp ? 'btn-sign-in': 'btn-sign-up'}`}
                    type="submit"
                    >
                        {!signUp ? 'Sign-in' : "Sign-up"}
                    </button>
                </div>
            </form>
            <div>
                {!signUp ? (
                    <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                        <p className="small fw bold mt-2 pt-1 mb-0">
                            Don,t have a account ?&nbsp;
                            <span 
                            className="link-danger"
                         style={{textDecoration:"none", 
                         cursor:"pointer"}}
                         onClick={()=> setSignUp(true)}
                         >
                                SignUp
                            </span>
                        </p>
                    </div>
                    </>
                ):(
                    <>
                    <div className="text-center justify-content-center mt-2 pt-2">
                        <p className="small fw bold mt-2 pt-1 mb-0">
                            Already have a account ?&nbsp;
                            <span className="link-danger" style={{textDecoration:"none", cursor:"pointer", color: "#298af2"}} onClick={()=> setSignUp(false)}>
                                SignIn
                            </span>
                        </p>
                    </div>
                    </>
                )}
            </div>
        </div>
       </div>
    </div>
   </div>
  )
}
