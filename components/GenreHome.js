import React, { Component } from 'react';
import '../Stylesheet/ViewGenre.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import QuizHome from './QuizHome'
import Home from './Home'

class GenreHome extends Component{
  constructor(params) {
    super();
    this.state = {
      identity:[],
      genre_id:params.match.params.genre_id,
      quizes:[]
    }
  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request(`http://127.0.0.1:8080/genre/${this.state.genre_id}`);
    fetch(request)
      .then(response => response.json())
        .then(identity => this.setState({identity: identity}));
    const request2 = new Request(`http://127.0.0.1:8080/quizes/${this.state.genre_id}`);
    fetch(request2)
      .then(response => response.json())
        .then(quizes => this.setState({quizes: quizes}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List of all quizes</h1>
        </header>
              <Router>
                <div>
                  <nav className="navbar navbar-default">
                    <div className="container-fluid">
                      <div className="navbar-header">
                        <Link className="navbar-brand" to={'/'}>React App</Link>
                      </div>
                      <ul className="nav navbar-nav">
                      {this.state.quizes.map(function(item, key) {
                           return (<li key = {key}><Link to={`/question/${this.state.genre_id}/${item.id}`}>{item.title}</Link></li>)
                       },this)}
                       </ul>
                    </div>
                  </nav>
                  <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/question/:genre_id/:quiz_id' component={QuizHome}/>
                  </Switch>
                </div>
              </Router>
      </div>
    );
  }
}

export default GenreHome;
