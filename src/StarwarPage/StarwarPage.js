import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { starwarActions } from '../_actions';

class StarwarPage extends React.Component {
    
   constructor(props) {
    super(props)
    this.state = {
      filtered: [],
    }
    
    this.handleChange = this.handleChange.bind(this)
  }
    
    componentDidMount() {
        //this.props.getUsers();
        this.props.getStarwars();
        const { user, starwars } = this.props;
        console.log('eeeeee:',starwars)
        
        this.setState({
            filtered: starwars.items
          });
          
    }
    
    componentWillReceiveProps(nextProps) {
      this.setState({
        filtered: nextProps.starwars.items
      });
      
      console.log('ffffff:',this.state.filtered)
    }

  
  handleChange(e) {
		// Variable to hold the original version of the list
    //let currentList = [];
    
		// Variable to hold the filtered list before putting into state
    let newResults = []
    let newListObject = {
        count : this.props.starwars.items.count,
        next: this.props.starwars.items.next,
        previous : this.props.starwars.items.previous,
        results : this.props.starwars.items.results
    };
   
		// If the search bar isn't empty
    if (e.target.value !== "") {
			// Assign the original list to currentList
            
      //currentList = this.props.starwars.items.results;
			// Use .filter() to determine which items should be displayed
			// based on the search terms
      newResults = this.props.starwars.items.results.filter(item => {
           //console.log('item:',item)
				// change current item to lowercase
        const lc = item.name.toLowerCase();
				// change search term to lowercase
        const filter = e.target.value.toLowerCase();
				// check to see if the current list item includes the search term
				// If it does, it will be added to newList. Using lowercase eliminates
				// issues with capitalization in search terms and search content
        return lc.includes(filter);
      });
    } else {
			// If the search bar is empty, set newList to original task list
      newResults = this.props.starwars.items.results;
    }
		// Set the filtered state based on what our rules added to newList
    newListObject.results = newResults;
    this.setState({
      filtered: newListObject
    });
  }
  
  
    render() {
        const { user, starwars } = this.props;
        return (
            <div className="col-lg-12">
             <div class="collapse navbar-collapse App-header" id="mainNavBar">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Starwar</a></li>
                        <li><Link to="/starwar" >Star War</Link></li>
                    </ul>
                        <ul class="nav navbar-nav navbar-right">
                        <li className="marginTop15"><span>Hi! {user.firstName}</span></li>
                        <li><Link to="#">Profile</Link></li>
                        <li><Link to="/login">Logout</Link></li>
                    </ul>
                </div>
                
             <div className="col-md-12  App-content"> 
                <div className="filter-list marginTop">
                        <div>
                         <input type="text" className="form-control form-control-lg" onChange={this.handleChange} placeholder="Search..." />
                        </div>
                     
                 </div>             
                <h3>All Star Wars:</h3>
                
                {starwars.loading && <em>Loading starwar data...</em>}
                {starwars.error && <span className="text-danger">ERROR: {starwars.error}</span>}
                {starwars.items && this.state.filtered.results && 
                    <ul className="unOrdered">
                        {this.state.filtered.results.map((swar, index) =>
                            <li key={index}>
                                {index == 0 && <ul className="starwarHead"> <li>S.N</li>  <li>Name</li> <li> Climate</li> <li> Population</li> <li> Created</li> </ul>}
                                <ul className="starwar"> 
                                <li>{index + 1}</li>  <li>{swar.name}</li> <li> {swar.climate}</li> <li> {swar.population}</li>  <li> {swar.created}</li> 
                                </ul>
                            </li>
                            
                        )}
                    </ul>
                } 
                
            </div>
            </div>
        );
    }
}


function mapState(state) {
    const { authentication, starwars } = state;
    const { user } = authentication;
    return { user, starwars };
}

const actionCreators = {
    getStarwars: starwarActions.getAll,
}

const connectedStarwarPage = connect(mapState, actionCreators)(StarwarPage);
export { connectedStarwarPage as StarwarPage };