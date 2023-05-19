interface Contact {}

// getAddress returns the address of a contact object
// contacts have an id, name, and address that will need to be added to the interface above
export function getAddress(): void {}

// howManyFriends is passed an array of contacts
// it should return the number of contacts in the given array
export function howManyFriends(): void {}

// findTheBat is passed an array of contacts
// and returns the address of Batman
// or null if there is no Batman
export function findTheBat(): void {}

// ----------- OPTIONAL VS REQUIRED KEYS -----------

// generateNewUser is passed a name
// it should return a new (unverified) user object
export function generateNewUser(): void {}

// verifyUser is passed a User object and an email
// it should return a new User object with an email and verified set to true
export function verifyUser(): void {}

// updateUserPhoto is passed a User object and a picture url
// it should return a new User object with the picture set to the given url
export function updateUserPhoto(): void {}

// getUserPhoto is passed a User object
// it should return the picture if it exists
// otherwise it should return a link to a kitten -> https://placekitten.com/200/300
export function getUserPhoto(): void {}

// ----------- RECORDS -----------

// getUser is passed two arguments, an id number and
// an object with numbers as keys and Users as values
// getUser should return the user with the given id
// or null if there is no user with that id
export function getUser(): void {}
