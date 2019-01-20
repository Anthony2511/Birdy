import React, {Component} from 'react';
import firebase from 'firebase';
import HeaderHome from "./HeaderHome";
import NavBar from "./Navbar";
import Input from './Input';
import {Link} from 'react-router-dom';

class AddCapture extends Component {
    state = {
        birds: null,
        newBird: {
            common_name: '',
            bague: '',
            reprise: false,
            latin_name: '',
            alaire: '',
            sex: '',
            weight: '',
            fat: '',
            age: '',
        },
    };

    componentWillMount(){
        let currentUserId = firebase.auth().currentUser.uid;
        firebase.database().ref("users/" + currentUserId).on("value", snapshot => {
            this.setState({ userData: snapshot.val()})
            console.log(currentUserId);
        })
    }
    componentDidMount() {
        const bird = firebase.database().ref('single_captures');

        bird.on('value', snap => {
            this.setState({
                single_captures: snap.val()
            })
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        const newBird = this.state.newBird;
        const bird = firebase.database().ref('single_captures');
        bird.push({newBird});
    };

    handleAdd = ({ currentTarget: input }) =>{
        const newBird = input.value;
        this.setState({newBird});
    }

    render() {

        const sexOptions = [
            'M',
            'F'
        ]
        const {newBird} = this.state;
        return (
            <React.Fragment>
                <HeaderHome/>
                <div className="wrap">
                    <h3 aria-level="3" className="title">Ajouter une capture</h3>
                    <button onClick={this.logout} className="button__logout"><span className="hidden">Logout</span>
                    </button>
                    <Link to="/" className="button__home"><span className="hidden">Home</span></Link>
                    <div className="form__container">
                        <form action="" onSubmit={this.handleSubmit}>
                            <div className="form__bloc">
                                <Input
                                    value={newBird.common_name}
                                    onChange={this.handleAdd}
                                    id="common_name"
                                    name="common_name"
                                    type="text"
                                    label="Nom commun"
                                    placeholder="Jean Dupont"/>
                            </div>
                            <div className="form__bloc">
                                <Input
                                    value={this.state.newBird.bague}
                                    onChange={this.handleAdd}
                                    id="bague"
                                    name="bague"
                                    type="number"
                                    label="Type de bague"
                                    placeholder="785495"/>
                            </div>
                            <div className="form__bloc">
                                <Input
                                    value={this.state.newBird.reprise}
                                    onChange={this.handleAdd}
                                    id="inputReprise"
                                    name="reprise"
                                    type="boolean"
                                    label="Est-ce une reprise ?"/>
                            </div>
                            <div className="form__bloc">
                                <Input
                                    value={this.state.newBird.latin_name}
                                    onChange={this.handleAdd}
                                    id="latin_name"
                                    name="latin_name"
                                    type="text"
                                    label="Nom latin"/>
                            </div>
                            <div className="form__bloc">
                                <Input
                                    value={this.state.newBird.sex}
                                    onChange={this.handleAdd}
                                    id="sex"
                                    name="sex"
                                    type="text"
                                    label="Sexe"/>
                            </div>
                            <button type="submit"
                                    className="button__form">
                                Ajouter la capture
                            </button>
                        </form>
                    </div>
                </div>
                <NavBar/>
            </React.Fragment>
        );

    }

}

export default AddCapture;