import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, SearchBtn } from "../../components/Search";

class Articles extends Component {
  state = {
    articles: [],
    results: [],
    title: "",
    start: "",
    end: "",
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, title: "", start: "", end: ""})
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title) {
      API.searchArticles({
        title: this.state.title,
        start: this.state.start,
        end: this.state.end,
      })
        .then(res => {
          let searchArray = res.data.response.docs.slice(0,10);
          let articlesObj = searchArray.map(function(article) {
            let articleObj = {
              title: article.headline.main,
              url: article.web.url,
              date: article.pub_date
            }
            return articleObj;
          })
          this.setState({results: articlesObj});
        }
        .catch(err => console.log(err));
    }
  };

  handleSaveArticle = event => {
    API.saveArticle(article)
    .then(res => this.loadArticles());
    .catch(err => console.log(err));
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h2>What Articles Should I Save?</h2>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (Required)"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="Start (Optional)"
              />
              <TextArea
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="End (Optional)"
              />
              <SearchBtn
                disabled={!(this.state.username && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Article
              </SearchBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h2>Articles On My List</h2>
            </Jumbotron>
            {this.state.results.length ? (
              <List>
                {this.state.results.map( (article, index) => (
                  <ListItem key={article._id}>
                      <strong>
                        {article.title} by {article.url}
                      </strong>
                    <SaveBtn onClick={() => this.saveArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
           <Col size="md-6 sm-12">
            <Jumbotron>
              <h2>Articles Saved</h2>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title} by {article.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
