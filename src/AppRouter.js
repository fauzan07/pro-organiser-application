import React from 'react';
import {Route,Switch} from "react-router-dom";
import CreateBoard from './../src/pages/CreateBoard/CreateBoard';
import AllBoards from './../src/pages/AllBoards/AllBoards';
import Board from './../src/pages/Board/Board';



function AppRouter(){

    return (
    <Switch>
        <Route path="/createboard" component = {CreateBoard}></Route>
        <Route path="/" exact  component = {AllBoards}></Route>
        <Route path="/:boardName" component = {Board}></Route>
        <Route path="*" render = {() => <h3>Page not Found!</h3>}></Route>
    </Switch>
    );
    
}

export default AppRouter;
