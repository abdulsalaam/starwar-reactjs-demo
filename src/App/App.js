import React from 'react';
import { Router, Switch, Route } from 'react-router-dom'
import { connect, Provider } from 'react-redux';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { StarwarPage } from '../StarwarPage';
import { history, store } from '../_helpers';
import { alertActions } from '../_actions';


import './../App.css'

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;
        return (
            
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Provider store={store}>
   <Router history={history}>
      <Switch>
         <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
           <Route path="/starwar" component={StarwarPage} />
          <Route path="/*" component={() => 'NOT FOUND'} />
      </Switch>
   </Router>
</Provider>
                    </div>
                </div>
          
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };