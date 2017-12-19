import axios from "axios";

//API: adc94b2a469f44f5b13d99301746217b
const key = adc94b2a469f44f5b13d99301746217b;
const URL = "https://api.nytimes.com/svc/search/v1/article?format=json&query=smoking&api-key="
export default {
  // Gets all articles
  getArticles: function() {
    return axios.get(URL + key);
  },
  // Gets the article with the given id
  getArticle: function(id) {
    return axios.get("/api/articles/" + id);
  },
  // Deletes the article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
