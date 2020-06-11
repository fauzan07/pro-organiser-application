import React, { useState, useEffect } from "react";
import style from "./AddColumn.module.css";
import Modal from './../../common/Modal/Modal';
import Axios from "axios";

function AddColumn(props) {
  const [showModal, setShowModal] = useState(false);
  const [columnName, setColumnName] = useState("");
  const [formComplete, setFormComplete] = useState(false);
  const [formIncompleteError, setFormIncompleteError] = useState(false);

  const columnNames  = React.useRef();

  useEffect(() => {
    modalOpenHandler();
  }, [showModal]);

  const handleAddColumnClick = (event) => {
        if(columnNames.current.value.length === 0){
          setFormComplete(false);
          setFormIncompleteError(true);
    } else {
      // add column name in firebase
      Axios.post(`https://pro-organiser-app.firebaseio.com/boardContents/${props.boardId}/column.json`, {
        name: columnName,
      })
        .then((response) => {
          // alert("column added succesfully");
          props.setShowColumn(true);
        })
        .catch((error) => console.log(error));

      setShowModal(false);
    }
  };

  const modalOpenHandler = () => {
    let colBox = document.getElementById("addColumnBox");
    colBox.addEventListener("click", () => {
      setShowModal(true);
    });
  };

  const  modalCloseHandler = () => {setShowModal(false)};

  let modalContent = showModal ? 

  (
      <>
      {formIncompleteError ? <p style={{color : 'red'}}>Kindly complete the form before adding Column</p> : null}
      <div className={style.AddColumnForm}>
        <h2>Add column</h2>
       <div className={style.FormInput}><span className={style.Lable}>Enter a column name:</span><input type="text" id="column_name" value={columnName} placeholder="Enter a column name" ref={columnNames} onChange={(event) => setColumnName(event.target.value)}/></div>
      </div>
      <button className={style.AddButton} id="CreateColumn" disabled={formComplete} onClick={handleAddColumnClick}>Add Column</button>
      </>
  )
  :null;

  return (
    <div>
       <div className={style.addColumnBox} id="addColumnBox">
        <div>Add a column</div>
      </div>
        <br />
        {showModal && (
        
            <Modal  
                content = {modalContent}
                close = {modalCloseHandler}/> 
        )}
       
    </div>
)
}

export default AddColumn;
