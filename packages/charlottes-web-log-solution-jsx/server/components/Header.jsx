function Header({ link, title }) {
  return (
    <h1 class="text-4xl font-bold text-center">
      <a href={link}>{title}</a>
    </h1>
  )
}

export default Header
