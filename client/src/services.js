import axios from "axios";

export default axios.create({
    baseURL: "https://arcane-brushlands-47211.herokuapp.com/",
    withCredentials: true,
});