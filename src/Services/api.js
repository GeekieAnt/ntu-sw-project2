import axios from "axios";

const api = axios.create({
  baseURL: "https://api.rawg.io/api",
  params: {
    key: "88ad5f548ef541b9964efb9a84218005",
  },
});

export default api;
