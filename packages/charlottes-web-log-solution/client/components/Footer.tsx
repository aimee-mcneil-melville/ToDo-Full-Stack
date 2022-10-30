import footer from '../data/footer'

export default function Footer() {
  return (
    <div className="footer">
      <div>&copy; {footer.copyright}</div>
      <div>{footer.author}</div>
    </div>
  )
}
