import { useParams, Link } from "react-router-dom"
import { useArtworkDetails } from "../hooks/api"
import LoadingIndicator from "./LoadingIndicator"
import ErrorMessage from "./ErrorMessage"

export default function ArtworkDetails() {
  const params = useParams()  
  const id = Number(params.id)
  const detail = useArtworkDetails(id)
  
  if (detail.isLoading) {
    return <LoadingIndicator />
  }

  if (detail.isError || detail.data == undefined) {
    return <ErrorMessage error={detail.error} />
  }

  const {
    name, medium, description, gallery_name, gallery_id
  } = detail.data

  return <>
    <h2>Artwork: {name}</h2>
    <em>Medium: {medium}</em>
    <p>{description}</p>
    {
      gallery_id == undefined ? null : <>
        <p>Currently at <Link to={`/galleries/${gallery_id}`}>{gallery_name}</Link></p>
      </> 
    }
  </>
}