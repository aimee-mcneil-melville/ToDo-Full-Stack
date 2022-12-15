import connection from './connection'
 
export function getAllPosts(db = connection) {
   return
 }
 
export function getPost( db = connection) {
 }
// TODO: rather than making a second database call to fetch the newly-created
// (or newly-updated) record, a more efficient approach would be to reconstruct
// the record based on the details passed in, plus the id returned from the first
// database call
export function addPost(db = connection) {
  return 
}

export function updatePost(db = connection) {
  return 
}

// TODO: when deleting a post, also delete its comments
export function deletePost(db = connection) {
  return 
}

