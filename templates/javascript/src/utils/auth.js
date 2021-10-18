import decodeJWT from 'jwt-decode';

export const setAuthUser = (response) => {
  const { access } = response;
  localStorage.setItem('token', access);
};

export const setUserToken = (token) => {
  localStorage.setItem('token', token);
};

export const isUserAuthenticated = () => {
  const token = getUserToken();
  if (!token) return false;

  const decodedToken = decodeJWT(token);
  const { exp } = decodedToken;
  const currentTime = Date.now() / 1000;

  if (exp < currentTime) {
    localStorage.removeItem('token');
    return false;
  }

  return true;
};

export const getUserToken = () => {
  return localStorage.getItem('token');
};

export const getUserFromStorage = () => {
  const { token } = localStorage;

  const data = {
    isAuthenticated: false,
  };

  if (token) {
    const decodedToken = decodeJWT(token);
    const { exp } = decodedToken;
    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token');
      return data;
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return {
      ...user,
      isAuthenticated: true,
    };
  }

  return data;
};

export const updateUser = (data) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const updatedUserDetails = { ...user, ...data };
  localStorage.setItem('user', JSON.stringify(updatedUserDetails));
  return updatedUserDetails;
};

export const removeUserFromStorage = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.replace('/');
};
