import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dark-jade-rabbit-garb.cyclic.app/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    console.log(data);
    return data.articles;
  });
};
