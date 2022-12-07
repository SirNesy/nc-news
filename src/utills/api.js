import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://dark-jade-rabbit-garb.cyclic.app/api",
});

export const getArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticle = (article_id) => {
  let path = `/articles/${article_id}`;

  return newsApi.get(path).then(({ data }) => {
    // console.log(data.results);
    return data.results[0];
  });
};
