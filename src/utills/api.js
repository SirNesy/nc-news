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

export const getComments = (article_id) => {
  let path = `/articles/${article_id}/comments`;

  return newsApi.get(path).then(({ data }) => {
    return data.comments;
  });
};

export const getUsers = () => {
  let path = "/users";
  return newsApi.get(path).then(({ data }) => {
    return data.users;
  });
};

export const getTopics = () => {
  let path = "/topics";
  return newsApi.get(path).then(({ data }) => {
    return data.topics;
  });
};

export const patchIncVotes = (article_id) => {
  let path = `/article/${article_id}`;

  return newsApi.patch(path, { inc_votes: 1 }).then(({ data }) => {
    return data.article;
  });
};

export const patchDecVotes = (article_id) => {
  let path = `/articles/${article_id}`;

  return newsApi.patch(path, { inc_votes: -1 }).then(({ data }) => {
    console.log(data.article.votes);
    return data.article;
  });
};
