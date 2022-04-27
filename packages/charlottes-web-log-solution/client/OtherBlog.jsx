import React from 'react'

const OtherBlog = props => {
  const { blogTitle, link } = props.blog
  return (
    <li className='other-blog'>
      <a href={link}>{blogTitle}</a>
    </li>
  )
}

export default OtherBlog
