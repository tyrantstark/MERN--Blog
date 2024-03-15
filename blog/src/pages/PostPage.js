import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PostPage() {
    const {id}=useParams();
    const [postInfo,setPostInfo]=useState(null)
    useEffect(()=>{
        //console.log(id);
        fetch(`http://localhost/4000/post/${id}`)
        .then(response =>{
            response.json().then(postInfo =>{
                setPostInfo(postInfo);
            })
        })

    },[id])
    if(!postInfo) return '';
  return (
    <div className='post-page'>
      <div className='image'>
        <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>

      </div>
      <h1>
         {postInfo.title}
      </h1>
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>

    </div>
  )
}

export default PostPage