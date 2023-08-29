import otherBlogsData from '../data/other-blogs.ts'
import OtherBlog from './OtherBlog.tsx'

export default function OtherBlogs() {
  return (
    <div className="other-blogs">
      <header>Other Blogs</header>
      <ul>
        {otherBlogsData.map((blog) => {
          return (
            <OtherBlog
              key={blog.id}
              blogTitle={blog.blogTitle}
              link={blog.link}
            />
          )
        })}
      </ul>
    </div>
  )
}
