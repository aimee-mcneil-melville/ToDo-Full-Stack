function Home({ puppies }) {
  return (
    <div class="container">
      {puppies.map(({ id, name, image }) => (
        <div class="puppy-list">
          <a href={`/${id}`}>
            <img class="img-circle" src={image} alt={name} />
          </a>
        </div>
      ))}
    </div>
  )
}

export default Home
