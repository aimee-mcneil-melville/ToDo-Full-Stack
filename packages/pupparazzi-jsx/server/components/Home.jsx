function Home({ puppies }) {
  return (
    <div class="container">
      {puppies.map((puppy) => (
        <div key={puppy.id} class="puppy-list">
          <a href={`/puppies/${puppy.id}`}>
            <img class="img-circle" src={puppy.image} alt={puppy.name} />
          </a>
        </div>
      ))}
    </div>
  )
}

export default Home
