import OtherBlog from './OtherBlog.jsx'

function OtherBlogs({ otherBlogsData }) {
  return (
    <div className="bg-yellow-100">
      <header>Other Blogs</header>
      <ul className="flex flex-col gap-4 ">
        {otherBlogsData.map((blog) => (
          <OtherBlog
            key={blog.id}
            blogTitle={blog.blogTitle}
            link={blog.link}
          />
        ))}
      </ul>
    </div>
  )
}

export default OtherBlogs
