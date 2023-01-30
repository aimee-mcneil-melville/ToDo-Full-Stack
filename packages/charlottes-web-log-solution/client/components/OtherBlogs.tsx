import otherBlogsData from '../data/other-blogs'
import OtherBlog from './OtherBlog'

export default function OtherBlogs() {
  return (
    <div className="other-blogs">
      <header>Other Blogs</header>
      <ul>
        {otherBlogsData.map((blog) => {
          return <OtherBlog key={blog.id} blog={blog} />
        })}
      </ul>
    </div>
  )
}
