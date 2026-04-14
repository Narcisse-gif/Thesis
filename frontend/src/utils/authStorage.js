const TOKEN_KEY = 'token';
const ROLE_KEY = 'user_role';

export function getToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function getUserRole() {
  return sessionStorage.getItem(ROLE_KEY);
}

export function setAuthSession(token, role) {
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(ROLE_KEY, role);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function clearAuthSession() {
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function migrateLegacyAuth() {
  const legacyToken = localStorage.getItem(TOKEN_KEY);
  const legacyRole = localStorage.getItem(ROLE_KEY);

  if (legacyToken || legacyRole) {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
  }
}
