import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {

  getProfile(): JwtPayload | null {
    // TODO: return the decoded token
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload>(token)
    } catch (err) {
      console.error('Error decoding token:', err)
      return null;
    }
  }

loggedIn() {
  // TODO: return a value that indicates if the user is logged in
  const token = this.getToken();
  console.log("Got the token! It looks like this: ", token);
  return token && !this.isTokenExpired(token);
}

isTokenExpired(token: string): boolean {
  // TODO: return a value that indicates if the token is expired
  try {
    const { exp } = jwtDecode<JwtPayload>(token)
    if (!exp) return true;
    const currentTime = Date.now() /1000;
    return exp < currentTime;
  }catch (err) {
    console.error('Error checking token expiration:', err)
    return true;
  }
}

getToken(): string | null {
  // TODO: return the token
  return localStorage.getItem('token');
}

login(idToken: string) {
  // TODO: set the token to localStorage
  localStorage.setItem('token', idToken);
  // TODO: redirect to the home page
  window.location.assign('/');
}

logout() {
  // TODO: remove the token from localStorage
  localStorage.removeItem('token')
  // TODO: redirect to the login page
  window.location.assign('/');
  }
}


export default new AuthService();
