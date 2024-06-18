let user = {
    username: "exampleUser",
    password: "examplePassword"
  };
  
  // Deleting the password property
  delete user.password;
  
  // console.log(user); // Output: { username: "exampleUser" }

   user = undefined;
  if(user && 1){
   console.log(user); // Output: { username: "exampleUser
  }
  