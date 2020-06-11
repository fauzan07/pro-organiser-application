import React, { useState, useEffect } from "react";
import style from  './Board.module.css';
import Axios from 'axios';
import { withRouter, useHistory } from "react-router-dom";
import Loader from "../../common/loader/Loader";
import AddColumn from "../../components/addColumn/AddColumn";
import Card from "../../components/card/Card";

export const Board = (props) => {
    const name = props.match.params.boardName;
    const members = props.location.state.members;

    const [columnData, setColumnData] = useState({});
    const [showColumn, setShowColumn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isCardDragged, setIsCardDragged] = useState(false);
    const [isColumnDelete, setIsColumnDelete] = useState(false);

     // to use history function
    const history = useHistory();

    document.title = `${name} | Pro Organizer`;

    useEffect(() => {
        setShowColumn(false);
        setIsCardDragged(false);
        setIsColumnDelete(false);
        getColumnData();
    }, [showColumn, isColumnDelete, isCardDragged]);
  
    const getColumnData = () => {
        Axios
        .get(`https://pro-organiser-app.firebaseio.com/boardContents/${props.location.state.boardId}/column.json`)
        .then((response) => {
            setTimeout(setColumnData(response.data), 5000);
          setLoading(false);
        })
        .catch((error) => console.log(error));
    };

      // handle board delete
    const handleBoardDelete = (e) => {
      if (window.confirm("Are you sure you want to delete the board?")) {
        Axios
        .delete(`https://pro-organiser-app.firebaseio.com/boardContents/${props.location.state.boardId}.json`)
          .then((response) => {
            // alert("board deleted succesfully");
            history.push("/");
          })
          .catch((error) => console.log("Error" + error));
      }
    };

      // handle column delete
    const handleColumnDelete = (columnId, e) => {
      if (window.confirm("Are you sure you want to delete the Column?")) {
      Axios
      .delete(`https://pro-organiser-app.firebaseio.com/boardContents/${props.location.state.boardId}/column/${columnId}.json`)
        .then((response) => {
          // alert("column deleted succesfully");
          setIsColumnDelete(true);
        })
        .catch((error) => console.log("Error" + error));
      }
    };

      //  handle card drop
  const handleCardDrop = (droppedColumnId, e) => {
    e.preventDefault();
    var droppedCardData = JSON.parse(e.dataTransfer.getData("text/plain"));
    console.log(droppedCardData);

    const prevColId = droppedCardData.columnId;
    const prevCardId = droppedCardData.dragCardId;
    const draggedCardData = droppedCardData.cardData;

    if (draggedCardData !== null) {
      //   // Delete from previous column
      Axios
      .delete(`https://pro-organiser-app.firebaseio.com/boardContents/${props.location.state.boardId}/column/${prevColId}/card/${prevCardId}.json`)
        .then((response) => {
          console.log("card removed");
        })
        .catch((error) => console.log("Error" + error));

      // Add card to new column
      Axios
      .post(`https://pro-organiser-app.firebaseio.com/boardContents/${props.location.state.boardId}/column/${droppedColumnId}/card.json`,
        {
          cardTitle: draggedCardData.cardTitle,
          team: draggedCardData.team,
          descrptn: draggedCardData.descrptn,
          dueDate: draggedCardData.dueDate,
        }
      )
        .then((res) => {
          console.log("card added in new column");
          // call new card
        })
        .catch((err) => console.log("Error" + err));
      setIsCardDragged(true);
    }
  };

    return (
        <div>
          <br />
          {loading ? (
            <Loader></Loader>
          ) : (
              <div className={style.ColumnContainer}>
                  <div className={style.ColumnHeader}>
                    <div className={style.ColumnTitle}>
                        <span>{name}</span>
                    </div>
                    <div className={style.DeleteBoardBtn}>
                        <button className={style.DeleteBtn} onClick={handleBoardDelete}>Delete Board</button>
                    </div>
                </div>
                <br />
                  <div className={style.ColumnDatas}>
                  {columnData &&
                  Object.entries(columnData).map((item) => (
                 
                          <div className={style.ColumnCard} key={item[0]}>
                            <div className={style.ColumnCardHead}>
                              <span className={style.ColumnNames}>
                                {item[1].name}
                              </span>
                              <div className={style.deleteColumn}>
                              <i
                                className="fas fa-trash-alt"
                                onClick={(e) => handleColumnDelete(item[0], e)}
                              ></i>
                            </div>
                          </div>
                          <div
                              className={style.cardContainer}
                              onDrop={(e) => handleCardDrop(item[0], e)}
                              onDragOver={(e) => {
                                e.preventDefault();
                              }}
                            >
                            <Card
                              members={members}
                              columnId={item[0]}
                              boardId={props.location.state.boardId}
                              boardTitle={name}
                              isCardDragged={isCardDragged}
                            ></Card>
                          </div>
                          </div>
                     
                      ))}
                        <AddColumn
                        pathname={props.location.pathname}
                        boardId={props.location.state.boardId}
                        getColumnData={getColumnData}
                        setShowColumn={setShowColumn}
                      ></AddColumn>
                  </div>
              </div>
          )}
        </div>
      );
    }
    

export default withRouter(Board);
