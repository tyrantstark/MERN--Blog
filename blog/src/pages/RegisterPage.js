import React, { useState } from 'react'
import Post from '../Post';

function RegisterPage() {
    const[username,setUsernme]=useState('');
    const[password,setPassword]=useState('');
    async function register(e)
    {
        e.preventDefault();
      await  fetch('http://localhost:4000/register',{
            method:'POST',
            body:JSON.stringify({username,password}),
            headers:{'Content-Type':'application/json'}
        }).then((res)=>{
          alert("Registration Successful")
          console.log(res);
        }).catch((e)=>{
          alert('Registration Failed')
          console.log(e);
        })

    }

  return (
    <form className='register' onSubmit={register}>
    <h1>Register</h1>
    <input type='text' placeholder='username'
    value={username}
    onChange={e=>setUsernme(e.target.value)}
    />
    <input type='password' placeholder='password'
    value={password}
    onChange={e=>setPassword(e.target.value)}
    />
    <button>Register</button>
</form>
  )
}

export default RegisterPage