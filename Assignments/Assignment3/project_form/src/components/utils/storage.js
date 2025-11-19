// small helper for localStorage user list
const STORAGE_KEY = "users_app_data_v1";

export function readUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function addUser(user) {
  const users = readUsers();
  // put newest first
  users.unshift(user);
  writeUsers(users);
}

export function getUserById(id) {
  const users = readUsers();
  return users.find(u => u.id === id);
}
