export const createUser =
 `mutation { createUser(
    data: { name:"testuser", email: "testuser@test.com", password: "testpassword" }
  ){
    id
    name
    email
    password
    avatar
    createdAt
    updatedAt
  }
}`
