import React, {FontAwesomeIcon} from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <div style={{backgroundColor: "yellow", marginRight: "10px", paddingRight: "10px"}}>
      <h3>Меню</h3>
      
      <ul>
        <li>
        
          <Link class="fa fa-user" to="/profile"> Профіль</Link>
        </li>
        <li>
          <Link class="fa fa-tasks" to="/new-tasks">Нові завдання</Link>
        </li>
        <li>
          <Link class="fa fa-reply" to="/waiting-response">Очікування відповіді</Link>
        </li>
        <li>
          <Link to="/my-tasks">Мої завдання</Link>
        </li>
        <li>
          <Link to="/task-form">Додати завдання</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
