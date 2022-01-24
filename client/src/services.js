import axios from "axios";

const deployURL = "https://arcane-brushlands-47211.herokuapp.com/";
//const developURL = "http://localhost:5000";

const CURRENT_URL = deployURL;

export function getImageURL(image) {
    return `${
    image &&
    `${CURRENT_URL}/api/image/${image.split(" ").join("%20").toString()}`
  }`;
}

export function reqUserById(id) {
  return axios
    .get(`${CURRENT_URL}/api/auth/${id}`)
    .then(({ data }) => data)
    .catch((error) => error);
}

export function reqBlogById(id) {
  return axios
    .get(`${CURRENT_URL}/api/blog/${id}`)
    .then(({ data }) => data.blog)
    .catch((error) => error);
}

export function reqBlogs() {
  console.log(`${CURRENT_URL}/api/blog/all`);
  return axios
    .get(`${CURRENT_URL}/api/blog/all`)
    .then(({ data }) => data)
    .catch((error) => error);
}

export function reqAuthorizedUser() {
  return axios
    .get(`${CURRENT_URL}/api/private`)
    .then(({ data }) => data)
    .catch((error) => error);
}

export default axios.create({
  baseURL: CURRENT_URL,
  withCredentials: true,
});