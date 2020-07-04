import React, { useState, useEffect, useContext } from "react";
import style from "./Card.module.css";
import Modal from './../../common/Modal/Modal';
import Axios from "axios";
import { AuthContext } from '../../context/Auth';

function Card(props) {
  const { currentUser } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  const { members, columnId, boardId, boardTitle, isCardDragged } = props;
  const [cardData, setCardData] = useState("");

  // to handle details of card
  const [showDetails, setShowDetails] = useState(false);
  const [cardName, setCardName] = useState("");
  const [descDetails, setDescDetails] = useState("");
  const [dateDetails, setDateDetails] = useState("");
  const [teamDetail, setTeamDetails] = useState([]);
  const [editDetails, setEditDetails] = useState(false);
  const [cardId, setCardId] = useState("");

  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isCardDelete, setIsCardDelete] = useState(false);
  const [isCardEdited, setIsCardEdited] = useState(false);

  const [cardTitle, setCardTitle] = useState("");
  const [team, setTeam] = useState([]);
  const [descrptn, setDescrptn] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [formComplete, setFormComplete] = useState(false);
  const [formIncompleteError, setFormIncompleteError] = useState(false);

  // to split members list string into array
  const memberArr = members.split(",");

  const cardNames = React.useRef();
  const teamDetails = React.useRef();
  const descrpDetails = React.useRef();
  const datesDetails = React.useRef();

  const userId = currentUser.uid;

    // to Hide past date
    var today = new Date();
    var month,
      day = null;
    if (today.getMonth() < 10 || today.getDate() < 10) {
      month = "0" + (today.getMonth() + 1);
      day = "0" + today.getDate();
    }
    var date = today.getFullYear() + "-" + month + "-" + day;

    useEffect(() => {
      setIsCardAdded(false);
      setIsCardDelete(false);
      setIsCardEdited(false);
      getCardData();
    }, [isCardAdded, isCardDragged, isCardDelete, isCardEdited]);


  const getCardData = () => {
    Axios
    .get(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents/${boardId}/column/${columnId}/card.json`)
    .then((response) => {
        setCardData(response.data);
    })
    .catch((error) => console.log(error));
};

  
  //  to Add and Edit cardData in DB
  const handleAddCardData = (e) => {
    //   check if all input is taken
    if(cardNames.current.value.length === 0 || teamDetails.current.value.length === 0 || descrpDetails.current.value.length === 0 || datesDetails.current.value.length === 0){
      setFormComplete(false);
      setFormIncompleteError(true);
    } else {
      // if user wants to edit then put request is used
      if (editDetails) {
        Axios
        .put(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents/${boardId}/column/${columnId}/card/${cardId}.json`,
          {
            cardTitle: cardTitle === "" ? cardName : cardTitle,
            team: team.length === 0 ? teamDetail : team,
            descrptn: descrptn === "" ? descDetails : descrptn,
            dueDate: dueDate === "" ? dateDetails : dueDate,
          }
        )
          .then((response) => {
            alert("card edited succesfully");
            setIsCardEdited(true);
          })
          .catch((error) => console.log("Error in editDetails" + error));
      }
      //  if user wants to add a new card
      else {
        Axios
        .post(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents/${boardId}/column/${columnId}/card.json`,
          {
            cardTitle: cardTitle,
            team: team,
            descrptn: descrptn,
            dueDate: dueDate,
          }
        )
          .then((response) => {
            alert("card added succesfully");
            setIsCardAdded(true);
          })
          .catch((error) => console.log("Error" + error));
      }

      setShowModal(false);
      setEditDetails(false);

      setCardTitle("");
      setTeam([]);
      setDescrptn("");
      setDueDate("");
    }
  };

  // on click of card this function shows details
  const onCardClick = (
    cardName,
    descDetails,
    dateDetails,
    teamDetails,
    cardId,
    e
  ) => {
    setShowDetails(true);

    setCardName(cardName);
    setDescDetails(descDetails);
    setDateDetails(dateDetails);
    setTeamDetails(teamDetails);
    setCardId(cardId);
  };

   // handles edit button click
   const handleEdit = (e) => {
    setShowDetails(false);
    setShowModal(true);
    setEditDetails(true);
  };

  // handles archive on card archive click
  const handleArchive = (e) => {
    Axios
    .delete(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents/${boardId}/column/${columnId}/card/${cardId}.json`)
      .then((response) => {
        alert("card archived succesfully");
        setIsCardDelete(true);
      })
      .catch((error) => console.log("Error" + error));

    setShowDetails(false);
  };

//To display multiple team member selected
  const onSelectChange = (e) => {
    const values = [...e.target.selectedOptions].map((opt) => opt.value);
    setTeam(values);
  };

  //to drag card
  const drag = (itemData, dragCardId, e) => {
    var draggedCard = {
      columnId: columnId,
      dragCardId: dragCardId,
      cardData: itemData,
    };

    e.dataTransfer.setData("text/plain", JSON.stringify(draggedCard));
    console.log(e.dataTransfer.getData("text/plain"));
  };

  //to drop card
  const allowDrop = (e) => {
    e.preventDefault();
  };

  const  modalCloseHandler = () => { setShowModal(false);setEditDetails(false);};

  const  showmodalCloseHandler = () => {setShowDetails(false)};

  //modal of Add and Edit Card
  let modalContent = showModal ? 

  (
      <>
      {formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding Card</p> : null}
      <div className={style.AddCardForm}>
        <h2>{editDetails ? 'Edit Card' : 'Add Card'}</h2>
       <div className={style.FormInput}><span className={style.Lable}>Enter a title for your task:</span><br></br><input type="text" id="title" defaultValue={editDetails ? cardName : ""} placeholder="e.g. Add a new icon" ref={cardNames} onChange={(e) => setCardTitle(e.target.value)}/></div>
       <div className={style.FormInput}><span className={style.Lable}>Choose members for this task(select multiple,if needed):</span><select  id="membersList" name="membersList" defaultValue={editDetails ? teamDetail : ""} multiple ref={teamDetails} onChange={onSelectChange}>{memberArr.map((item) => (<option value={item} key={item}>{item}</option>))}</select></div>
       <div className={style.FormInput}><span className={style.Lable}>Add the description for your task:</span><input id="description" type="text"  defaultValue={editDetails ? descDetails : ""} placeholder="Add your description here" ref={descrpDetails}  onChange={(e) => setDescrptn(e.target.value)}/></div>
       <div className={style.FormInput}><span className={style.Lable}>Select the due-date for this task:</span><input id="due_date" type="date" min={date} defaultValue={editDetails ? dateDetails : ""} ref={datesDetails} onChange={(e) => setDueDate(e.target.value)}/></div>
      </div>
      <button className={style.AddButton} id="CreateCard" disabled={formComplete} onClick={handleAddCardData}>{editDetails ? 'Edit Card' : 'Add Card'}</button>
      </>
  )
  :null;

  //modal of show card details
  let showmodalContent = showDetails ? 

  (
      <>
      <div className={style.ShowCardDetails}>
        <div className={style.ShowcardHeader}>
          <h2>{cardName}</h2>
          <div className={style.editAndArcbtn}>
            <button type="button" id="editBtn" className={style.EditButton} onClick={handleEdit}>Edit</button>
            <button type="button" id="archiveBtn" className={style.ArchiveButton} onClick={handleArchive}>Archive</button>
          </div>
        </div>
        <small>in {boardTitle}</small>
        <div className="HorizontalLine">
            <hr className="hrline"></hr>
        </div>
        <h3>Description</h3><div>{descDetails}</div>
        <br/>
        <h3>Members</h3>
        <div>
          {teamDetail !== undefined &&
            teamDetail.map((i) => (
              <span className={style.cardMembers} key={i}>{i.charAt(0)}</span>
            ))}
        </div>
        <br/>
        <h3>Due Date</h3><div>{dateDetails}</div>
      </div>
      </>
  )
  :null;

  return (
    <div>
      <div className={style.CardData}>
      {cardData ?
        Object.entries(cardData).map((item) => (
          <div  key={item[0]}>
          <div className={style.CardInfo}      
                id={item[0]}
                value={item[1].cardTitle}
                onClick={(e) =>
                  onCardClick(
                    item[1].cardTitle,
                    item[1].descrptn,
                    item[1].dueDate,
                    item[1].team,
                    item[0],
                    e
                  )
                }
                draggable="true"
                onDragStart={(e) => drag(item[1], item[0], e)}
                >
          <div className={style.CardHeader}>
          <div className={style.CardName}>{item[1].cardTitle}</div>
          </div>
          <div className={style.CardIcon}>
          <div><i className="fas fa-list"></i></div>
          <div>
                    {item[1].team !== undefined ? (
                      item[1].team.map((i) => (
                        <span className={style.cardMembers} key={i}>
                          {i.charAt(0)}
                        </span>
                      ))
                    ) : (
                      <div></div>
                    )}
                  </div>
          </div>
          </div>
          </div>
         ) ): <div className={style.NotaskAdd}>No tasks added</div>}
          <div className={style.CardBtn}>
            <button className={style.AddCardBtn} onClick={() => setShowModal(true)} onDragOver={allowDrop} >Add a card</button>
          </div>
      </div>
        <br />
        {showModal && (
        
            <Modal  
                content = {modalContent}
                close = {modalCloseHandler}/> 
        )}
       
       {showDetails && (
        
        <Modal  
            content = {showmodalContent}
            close = {showmodalCloseHandler}/> 
    )}

    </div>
)
}

export default Card;
