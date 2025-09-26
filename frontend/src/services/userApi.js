const API_URL = "http://localhost:4000/api/users"; 

// Register new user
export async function register(username, password) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to register");
  }
  return data; 
} 

// Login existing user
export async function login(username, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Failed to login");
  }

  // Save the token to localStorage
  if (data.token) {
    localStorage.setItem("token", data.token);
  }

  return data; 
}

// Logout user
export function logout() {
  localStorage.removeItem("token");
}