import React, { useContext, useState } from 'react'
import Post from '../Post';
import{Navigate} from 'react-router-dom'
import { UserContext } from '../UserContext';

function LoginPage() {
    const[username,setUsernme]=useState('');
    const[password,setPassword]=useState('');
    const [redirect,setRedirect]=useState(false)
    const {setUserInfo}=useContext(UserContext);
    async function login(e)
    {
        e.preventDefault();
      await  fetch('http://localhost:4000/login',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'},
            credentials:'include'
        }).then((res)=>{
            res.json().then((userInfo)=>{
              setUserInfo(userInfo);
              setRedirect(true);
              //alert("login Successful")
            })
          console.log(res);
        }).catch((e)=>{
          alert('login Failed')
          console.log(e);
        })

    }
    if(redirect)
    return <Navigate to={'/'}/>

  return (
    <form className='login' onSubmit={login}>
    <h1>Login</h1>
    <input type='text' placeholder='username'
    value={username}
    onChange={e=>setUsernme(e.target.value)}
    />
    <input type='password' placeholder='password'
    value={password}
    onChange={e=>setPassword(e.target.value)}
    />
    <button>Login</button>
</form>
  )
}

export default LoginPage