import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavComponent:React.FC = () => {

    return (
        <nav style={{paddingTop:'20px'}} >
            <NavLink style={{ margin:'10px', textDecorationLine:'none', color: '#ccc'}} to="/" exact >Find movie</NavLink>
            <NavLink style={{ margin:'10px', textDecorationLine:'none', color: '#ccc'}} to="/favorite" >Favorite movies</NavLink>
        </nav>
    );
}