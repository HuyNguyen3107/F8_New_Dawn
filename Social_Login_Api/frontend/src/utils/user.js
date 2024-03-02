import { SERVER_URL } from "../configs/index";

export async function getUsers(accessToken) {
  const res = await fetch(SERVER_URL + "/api/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return null;
}

export async function getUser(accessToken, id) {
  const res = await fetch(SERVER_URL + "/api/users/" + id, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
  return null;
}
