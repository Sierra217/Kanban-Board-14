import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  // TODO: make a POST request to the login route
try {

  const response = await fetch('/auth/login', {
    method:'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInfo),
})

if(!response.ok) {
  throw new Error('Login Failed');
}

const data = await response.json();

return data;
} catch(err){
  console.log('Couldnt log in user', err);
  return Promise.reject('Couldnt fetch the user')
}

}



export { login };
