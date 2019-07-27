import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';
import { StarwarPage } from '../StarwarPage';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div className="col-lg-12">
             <div class="collapse navbar-collapse App-header" id="mainNavBar">
                    <ul class="nav navbar-nav">
                        <li class="active"><a href="#">Home</a></li>
                        <li><Link to="/starwar" component={StarwarPage} >Star War</Link></li>
                    </ul>
                        <ul class="nav navbar-nav navbar-right">
                        <li className="marginTop15"><span>Hi! {user.firstName}</span></li>
                        <li><Link to="#">Profile</Link></li>
                        <li><Link to="/login">Logout</Link></li>
                    </ul>
                </div>
                
             <div className="col-md-12  App-content">   
                <h3>All registered users:</h3>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&
                    <ul className="unOrdered">
                        {users.items.map((user, index) =>
                            <li key={user.id}>
                                {user.firstName + ' ' + user.lastName}
                                {
                                    user.deleting ? <em> - Deleting...</em>
                                    : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteUser(user.id)} className="actionDelete" >Delete</a></span>
                                }
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
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };