import React , { Component }from 'react';
import './App.css';
import { recipes } from './tempList'
import RecipeList from './components/RecipeList'
import RecipeDetails from './components/RecipeDetails'


export class App extends Component {

  state = {
    recipes: recipes,
    url: 'https://www.food2fork.com/api/search?key=5326fb060345ae3e94808f3e40fa19f0',
    base_url: 'https://www.food2fork.com/api/search?key=5326fb060345ae3e94808f3e40fa19f0',
    details_id: 35775,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  };


  async getRecipes() {
    try {
      const data = await fetch(this.state.url);
      const jsonData = await data.json();
      console.log(jsonData)
      if(jsonData.recipes.length === 0){
          this.setState(() => { 
            return { error: 'Sorry, but search did not return any results'}})
      } else {
        this.setState(() => {
          return {recipes: jsonData.recipes}
        })
      }
    } catch(error) {
      console.log(error)
    }
  }

  componentDidMount() {
    this.getRecipes();
  }

  displayPage = (index) => {
    switch(index) {

      default: 
      case 1: 
      return( <RecipeList recipes={this.state.recipes}
      handleDetails={this.handleDetails}
      value={this.state.search}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      error={this.state.error}
      />)

      case 0: 
      return (<RecipeDetails  id={this.state.details_id}
        handleIndex={this.handleIndex}
      />)
    }
  }

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  }

  handleChange = (e) => {
    this.setState({
      search: e.target.value
    }, () => console.log(this.state.search))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {base_url, query, search } = this.state;
    this.setState(() => {
      return { url: `${base_url}${query}${search}`, search: ""}
    }, () => {this.getRecipes(); })
    
  }


  render() { 
    // console.log(this.state.recipes)
    return (
        <React.Fragment>
        {
          this.displayPage(this.state.pageIndex)
        }
          
        </React.Fragment>
      );

  }
  
}

export default App;
