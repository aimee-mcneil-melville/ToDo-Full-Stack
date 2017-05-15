const React = require('react')

const OtherBlog = require('./OtherBlog')

function OtherBlogs (props) {
  return (
    <div className='other-blogs'>
      <header>Other blogs</header>
      <ul>
        {props.blogs.map((blog, key) => {
          return <OtherBlog key={key} blog={blog} />
        })}
      </ul>
    </div>
  )
}

module.exports = OtherBlogs

