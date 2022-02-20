import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getPosts } from './postsHelper'

export default function Posts() {
  const { id } = useParams()
  const [postList, setpostList] = useState([])
  const user = useSelector(globalState => globalState.user)

  useEffect(() => {
    getPosts(id)
      .then((post) => {
        console.log('post', post);
        setpostList(post)
        return null
      })
  }, [user])
  console.log(postList);

  return (
    <>
      <ul className='list-primary'>
        {postList.map(item => {
          return (<>
            <li>author : {item.author}</li>
            <li>title :{item.title}</li>
            <li>comment :{item.content}</li>
            <li>createdOn :{item.createdOn}</li>
            <li>Name :{item.firstName}  {item.lastName}</li>
          </>)

        })}
      </ul>
    </>
  )
}
