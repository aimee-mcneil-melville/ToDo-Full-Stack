interface Props {
  blogTitle: string
  link: string
}

export default function OtherBlog({ blogTitle, link }: Props) {
  return (
    <li>
      <a href={link}>{blogTitle}</a>
    </li>
  )
}
