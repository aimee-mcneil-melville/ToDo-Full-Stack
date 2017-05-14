const React = require('react')

const OtherBlog = require('./OtherBlog')

function OtherBlogs (props) {
  return (
    <div className='other-blogs'>
      <ul>
        {props.blogs.map(blog => {
          return <OtherBlog blog={blog} />
        })}
      </ul>
    </div>
  )
}

module.exports = OtherBlogs

