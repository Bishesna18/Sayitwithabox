import React,{useState} from 'react'
import axios from 'axios'
import './login.css'
import { backendUrl } from '../../App'
import { toast } from 'react-toastify'
const login = ({setToken}) => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const onSubmitHandler=async(e)=>{
    try {
      e.preventDefault();
      const response=await axios.post(backendUrl+'/api/auth/admin',{email,password})
      console.log(response)
      if(response.data.success){
         setToken(response.data.token)
      }else{
         toast.error(response.data.message)    
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)   
    }
  }
  return (
    <div className='login'>
      <div  className='Wholeform'>
        <h1>Admin panel</h1>
      <div className="login-box">

        <form onSubmit={onSubmitHandler}>
            <div className='input-field email'>
                <p>Email address</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='your@gmail.com' required/>
            </div>
            <div className='input-field password'>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Enter your password' required/>
            </div>
            <button type='submit'> Login</button>
        </form>
        </div>
        </div>
      </div>
    
  )
}

export default login
