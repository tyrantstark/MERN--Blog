import { formatISO9075 } from 'date-fns';
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

    },[])
    if(!postInfo) return '';
  return (
    <div className='post-page'>
      <h1>
         {postInfo.title}
      </h1>
      <time> {formatISO9075(new Date(postInfo.createdAt))}</time>
      <div className='author'>by {postInfo.author.username}</div>
      <div className='image'>

        <img src={`http://localhost:4000/${postInfo.cover}`} alt=''/>

      </div>
      
      <div dangerouslySetInnerHTML={{__html:postInfo.content}}/>

    </div>
  )
}

export default PostPage