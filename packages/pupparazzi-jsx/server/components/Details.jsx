function Details({ puppy }) {
  const { id, name, breed, owner, image } = puppy
  return (
    <div className="puppy">
      <img class="img-circle" src={image} alt={name} />
      <h2>{name}</h2>
      <div>Breed: {breed}</div>
      <div>Owner: {owner}</div>
      <a href={`/puppies/${id}/edit`}>Edit</a>
    </div>
  )
}

export default Details
