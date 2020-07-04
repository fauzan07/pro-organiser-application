import React, {useContext} from 'react';
import {NavLink , withRouter } from "react-router-dom";
import fire from '../../config/Fire';
import { AuthContext } from '../../context/Auth';
import style from './Header.module.css';

const Header = () => {

    const { currentUser } = useContext(AuthContext);
       
        return (

            <>
            {currentUser ? (
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
                    <div className={style.NavTitle3} onClick={()=>fire.auth().signOut()}>Logout</div>
                </div>
            </div>
            ) : (
            <div></div>
                 
            )}
            </>
              
        )
    
}



export default withRouter(Header);
