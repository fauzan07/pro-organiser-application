import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import AppRouter from '../../AppRouter';
import style from './Main.module.css';



class Main extends Component {

    render() {
       
        return (

            <div>
            <div className={style.Navbar}>
            <NavLink to='/' >
                <span className={style.NavbarTitle}>Pro-Organizer</span>
            </NavLink>
                <div className={style.NavLinks}>
                    <NavLink to='/'  activeClassName='selected'>
                    <div className={style.NavTitle}>Home</div>
                    </NavLink>
                    <NavLink to='/createboard'>
                    <div className={style.NavTitle2}>Create a board</div>
                    </NavLink>
                </div>
            </div>
                <AppRouter/>
            </div>
        )
    }
}



export default Main;
