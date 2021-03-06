import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import {Link} from 'react-router-dom';

class Home extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            users: {
                first_name: ''
            }

        }
    }
    componentWillMount(){
        let userId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + userId).on("value", snapshot => {
            this.setState({ users: snapshot.val() })
        })
    }

    logout() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Bienvenue {this.state.users.first_name}</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <Link to="/addCapture" className="button__birdcage">Ajouter une capture</Link>
                    <div className="users__container-capture">
                        <Link to="/myCaptures" className="button__capture">Voir mes captures</Link>
                    </div>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default Home;