import React, { Component } from 'react';
import Axios from 'axios';
import style from './CreateBoard.module.css';


class CreateBoard extends Component {
    constructor(props){
        super(props);
        this.NameOfboard = React.createRef();
        this.TeamMember = React.createRef();
        this.TypeOfBoard = React.createRef();
    }
    
    state = {
    
        formComplete : false,
        formIncompleteError : false,
        selectedBoard : {}
    }


    componentDidMount() {
        Axios.get('https://pro-organiser-app.firebaseio.com/boardContents.json')
            .then(response => {
                console.log(response);
                this.setState({
                    boardContents: response.data
                })
            })
            .catch(error => {console.log(error)});
    }

    addBoardToDBHandler = (event) => {
        event.preventDefault();
        if(this.NameOfboard.current.value.length === 0 || this.TeamMember.current.value.length === 0 || this.TypeOfBoard.current.value.length === 0){
            this.setState({
                formComplete : false,
                formIncompleteError : true
            })
        }else{
            let selectedBoard = {...this.state.selectedBoard}
            selectedBoard.boardName = this.NameOfboard.current.value;
            selectedBoard.members = this.TeamMember.current.value;
            selectedBoard.boardType = this.TypeOfBoard.current.value;
            
            Axios.post('https://pro-organiser-app.firebaseio.com/boardContents.json', selectedBoard)
                .then(response => {
                    alert("Board added succesfully");
                                   this.props.history.push('/');
                                
                        }).catch(error => {console.log(error)});
                    }
                }

    render() {
    return (
        <div className={style.CreateMain}>
            {this.state.formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding the Board</p> : null}
            <div className={style.CreateTitle}>
            <span>Create a Board</span>
            </div>
          
            <form onSubmit={this.addBoardToDBHandler}>
            <label>
                <div className={style.Createlable}>Enter a name of your board:</div>
                <input id="name" type="text" name="name" placeholder="eg Agile Sprint Board" ref={this.NameOfboard} />
            </label>
            <label>
                <div className={style.Createlable}>Add your team members:</div>
                <input id="team" type="text" name="team" placeholder="Add your team (separated by commas)" ref={this.TeamMember} />
            </label>
            <label>
                <div className={style.Createlable}>Enter the type of your board:</div>
                <input id="type" type="text" name="type" placeholder="eg Design UX" ref={this.TypeOfBoard} />
            </label>
            <button type="submit" id="CreateBoard" className={style.CreateButton} disabled={this.state.formComplete}>create</button>
            </form>
        </div>
    );
}
}

export default CreateBoard;
