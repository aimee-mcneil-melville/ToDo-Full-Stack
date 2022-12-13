import type * as type from '../data/other-blogs'

interface Props {
  blog: type.OtherBlog
}

export default function OtherBlog({ blog }: Props) {
  const { blogTitle, link } = blog
  return (
    <li>
      <a href={link}>{blogTitle}</a>
    </li>
  )
}
