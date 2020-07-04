import React, { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import style from './CreateBoard.module.css';
import { AuthContext } from '../../context/Auth';
import { withRouter, useHistory } from "react-router-dom";

const CreateBoard = (props) => {
    const { currentUser } = useContext(AuthContext);

    const [formComplete, setFormComplete] = useState(false);
    const [formIncompleteError, setFormIncompleteError] = useState(false);
    const [isBoardAdded, setIsBoardAdded] = useState(false);

    const [nameOfboards, setNameOfboards] = useState("");
    const [teamMembers, setTeamMembers] = useState("");
    const [typeOfBoards, setTypeOfBoards] = useState("");


    const NameOfboard  = React.useRef();
    const TeamMember  = React.useRef();
    const TypeOfBoard  = React.useRef();

    const userId = currentUser.uid;

    // to use history function
    const history = useHistory();

    useEffect(() => {
        setIsBoardAdded(false);
      }, [isBoardAdded]);

    
    const addBoardToDBHandler = (event) => {
        event.preventDefault();
        if(NameOfboard.current.value.length === 0 || TeamMember.current.value.length === 0 || TypeOfBoard.current.value.length === 0){
        setFormComplete(false);
        setFormIncompleteError(true);
        } else {
        // add column name in firebase
        Axios.post(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents.json`, {
            boardName: nameOfboards,
            boardType: typeOfBoards,
            members: teamMembers,
            
            
        })
            .then((response) => {
                alert("Board added succesfully");
                history.push("/");
                setIsBoardAdded(true);
            })
            .catch((error) => console.log(error));

        }
    };

    return(

        <div className={style.CreateMain}>
        {formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding the Board</p> : null}
        <div className={style.CreateTitle}>
        <span>Create a Board</span>
        </div>
      
        <form onSubmit={addBoardToDBHandler}>
        <label>
            <div className={style.Createlable}>Enter a name of your board:</div>
            <input id="name" type="text" name="name" placeholder="eg Agile Sprint Board" ref={NameOfboard}  onChange={(event) => setNameOfboards(event.target.value)}/>
        </label>
        <label>
            <div className={style.Createlable}>Add your team members:</div>
            <input id="team" type="text" name="team" placeholder="Add your team (separated by commas)" ref={TeamMember}  onChange={(event) => setTeamMembers(event.target.value)}/>
        </label>
        <label>
            <div className={style.Createlable}>Enter the type of your board:</div>
            <input id="type" type="text" name="type" placeholder="eg Design UX" ref={TypeOfBoard}  onChange={(event) => setTypeOfBoards(event.target.value)}/>
        </label>
        <button type="submit" id="CreateBoard" className={style.CreateButton} disabled={formComplete}>create</button>
        </form>
    </div>

    );

}


// class CreateBoard extends Component {
//     constructor(props){
//         super(props);
//         this.NameOfboard = React.createRef();
//         this.TeamMember = React.createRef();
//         this.TypeOfBoard = React.createRef();

//         this.currentUser = useContext(AuthContext);
//         this.userId = currentUser.uid;
//     }
    
//     state = {
    
//         formComplete : false,
//         formIncompleteError : false,
//         selectedBoard : {}
//     }


//     componentDidMount() {
//         Axios.get(`https://pro-organiser-app.firebaseio.com/boardContents/${userId}.json`)
//             .then(response => {
//                 console.log(response);
//                 this.setState({
//                     boardContents: response.data
//                 })
//             })
//             .catch(error => {console.log(error)});
//     }

//     addBoardToDBHandler = (event) => {
//         event.preventDefault();
//         if(this.NameOfboard.current.value.length === 0 || this.TeamMember.current.value.length === 0 || this.TypeOfBoard.current.value.length === 0){
//             this.setState({
//                 formComplete : false,
//                 formIncompleteError : true
//             })
//         }else{
//             let selectedBoard = {...this.state.selectedBoard}
//             selectedBoard.boardName = this.NameOfboard.current.value;
//             selectedBoard.members = this.TeamMember.current.value;
//             selectedBoard.boardType = this.TypeOfBoard.current.value;
            
//             Axios.post('https://pro-organiser-app.firebaseio.com/boardContents.json', selectedBoard)
//                 .then(response => {
//                     alert("Board added succesfully");
//                                    this.props.history.push('/');
                                
//                         }).catch(error => {console.log(error)});
//                     }
//                 }

//     render() {
//     return (
//         <div className={style.CreateMain}>
//             {this.state.formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding the Board</p> : null}
//             <div className={style.CreateTitle}>
//             <span>Create a Board</span>
//             </div>
          
//             <form onSubmit={this.addBoardToDBHandler}>
//             <label>
//                 <div className={style.Createlable}>Enter a name of your board:</div>
//                 <input id="name" type="text" name="name" placeholder="eg Agile Sprint Board" ref={this.NameOfboard} />
//             </label>
//             <label>
//                 <div className={style.Createlable}>Add your team members:</div>
//                 <input id="team" type="text" name="team" placeholder="Add your team (separated by commas)" ref={this.TeamMember} />
//             </label>
//             <label>
//                 <div className={style.Createlable}>Enter the type of your board:</div>
//                 <input id="type" type="text" name="type" placeholder="eg Design UX" ref={this.TypeOfBoard} />
//             </label>
//             <button type="submit" id="CreateBoard" className={style.CreateButton} disabled={this.state.formComplete}>create</button>
//             </form>
//         </div>
//     );
// }
// }

export default withRouter(CreateBoard);
