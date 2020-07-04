import React, { useState, useEffect, useContext } from "react";
import style from  './AllBoards.module.css';
import Axios from 'axios';
import { Link } from "react-router-dom";
import Loader from "../../common/loader/Loader";
import { AuthContext } from '../../context/Auth';

export const AllBoards = () => {

    const { currentUser } = useContext(AuthContext);

    const [boardContents, setBoardContents] = useState({});
    const [showBoard, setShowBoard] = useState(false);
    const [loading, setLoading] = useState(true);

    const userId = currentUser.uid;

    document.title = "Pro Organizer";

    useEffect(() => {
        getBoardContents();
    }, [showBoard]);
  
    const getBoardContents = () => {
        Axios
        .get(`https://pro-organiser-app.firebaseio.com/${userId}/boardContents.json`)
        .then((response) => {
          setTimeout(setBoardContents(response.data), 50000);
          setLoading(false);
          if (boardContents !== null) {
            setShowBoard(true);
          } else setShowBoard(false);
        })
        .catch((error) => console.log(error));
    };

    return (
        <div>
          <br />
          {loading ? (
            <Loader></Loader>
          ) : (
            <>
              <div className={style.BoardContainer}>
                <div className={style.BoardsTitle}>
                    <span>Boards</span>
                </div>
                <br />
                {showBoard ? (
                  <div className={style.BoardsData}>
                    {boardContents &&
                      Object.entries(boardContents).map((item) => (
                        <Link
                          to={{
                            pathname: "/board/" + item[1].boardName,
                            state: {
                              type: item[1].boardType,
                              members: item[1].members,
                              boardId: item[0],
                            },
                          }}
                        >
                          <div className={style.BoardItem} key={item[1].boardName}>
                            <span className={style.BoardName}>
                               {item[1].boardName}
                            </span>
                          </div>
                        </Link>
                      ))}
                  </div>
                ) : (
                  <p>
                    You haven't created any boards. Kindly click on the 'Create
                    Board' button in the navigation bar to create a board.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      );
    }
    

export default AllBoards;
