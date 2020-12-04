const BASE_URL = "https://auth.nomoreparties.co";

const authApi = (password, email, sign) => {
  return fetch(`${BASE_URL}/${sign}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

const authApiCheck = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
};

export { authApi, authApiCheck };
