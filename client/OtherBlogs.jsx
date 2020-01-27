import React from 'react'

import OtherBlog from './OtherBlog'

const OtherBlogs = props => (
  <div className='other-blogs'>
    <header>Other blogs</header>
    <ul>
      {props.blogs.map(blog => {
        return <OtherBlog key={blog.id} blog={blog} />
      })}
    </ul>
  </div>
)

export default OtherBlogs
