import React, { Component } from 'react';
import '../Stylesheet/NewPerson.css';

class CreateQuestion extends Component {
  constructor(params) {
    super();
    this.state = {
      formData: {
          question:"",
          quiz_id : parseInt(params.match.params.quiz_id,10),
          answer:"",
          multi:true,
          score: parseInt(0,10),
      },
      submitted: false,
      response: []
    }
    this.handleQChange = this.handleQChange.bind(this);
    this.handleSChange = this.handleSChange.bind(this);
    this.handleAChange = this.handleAChange.bind(this);
    this.handleMChange = this.handleMChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (event) {
    event.preventDefault();
    fetch(`http://localhost:8080/question`, {
     method: 'POST',
     body: JSON.stringify(this.state.formData),
   })
      .then(response => {
        if(response.status >= 200 && response.status < 300)
          {
              this.setState({submitted: true});
          }
      });
  }

  handleQChange(event) {
    let tempVar = {...this.state.formData};
    tempVar.question = event.target.value;
    this.setState({formData:tempVar})
  }
  handleAChange(event) {
    let tempVar = {...this.state.formData};
    tempVar.answer = event.target.value;
    this.setState({formData:tempVar})
  }
  handleMChange(event) {
    let tempVar = {...this.state.formData};
    tempVar.multi = (event.target.value == 'true');
    this.setState({formData:tempVar})
  }
  handleSChange(event) {
    let tempVar = {...this.state.formData};
    tempVar.score = parseInt(event.target.value,10);
    this.setState({formData:tempVar})
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Create a New Question</h1>
        </header>
        <br/><br/>
        <div className="formContainer">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label>Question</label>
                <input type="text" className="form-control" value={this.state.title} onChange={this.handleQChange}/>
            </div>
            <div className="form-group">
                <label>Answer</label><br/>
                <label>Multi Correct</label>
                <input type="radio" name="typeOfQuestion" value={true} onChange={this.handleMChange}/>
                <label>Single Correct</label>
                <input type="radio" name="typeOfQuestion" value={false} onChange={this.handleMChange}/>
            </div>
            <div className="form-group">
                <label>Answer</label>
                <input type="text" className="form-control" value={this.state.answer} onChange={this.handleAChange}/>
            </div>
            <div className="form-group">
                <label>Score</label>
                <input type="number" className="form-control" value={this.state.score} onChange={this.handleSChange}/>
            </div>
            {console.log(this.state.formData)}
                <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h2>
              New question successfully added.
            </h2>
          </div>
        }

      </div>
    );
  }
}

export default CreateQuestion;
