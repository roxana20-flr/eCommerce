import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYjU3ZDViMDU3ZmY0MzlkNWY5N2UzMyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3MzA5ODAxOCwiZXhwIjoxNjczMzU3MjE4fQ.yFy_oRHuOBNwCKozAWn8HhmjM1sFO-aVPvS-mhEI3SY";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  header: { token: `Bearer ${TOKEN}` },
});