function Details(props) {
  const { name, breed, owner, image, id } = props.puppyDetails
  return (
    <div className="puppy">
      <img className="img-circle" src={image} alt={name} />
      <h2>{name}</h2>
      <div>Breed: {breed}</div>
      <div>Owner: {owner}</div>
      <a href={`/edit/${id}`}>Edit</a>
    </div>
  )
}

export default Details
