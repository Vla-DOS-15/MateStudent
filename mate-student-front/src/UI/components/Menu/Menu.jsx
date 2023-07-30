import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import s from './Menu.module.css'

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 40px;
  margin-right: 30px;
`;


const MenuToggle = styled.button`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: var(--header_background);
  padding: 20px;
  margin: 10px;
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <MenuContainer>
      <MenuToggle onClick={handleMenuToggle}>
        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
      </MenuToggle>
      <MenuList isOpen={isMenuOpen} >
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/profile">Профіль</NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/new-tasks">Нові завдання</NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/waiting-response">Очікування відповіді</NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/my-tasks">Мої завдання</NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/task-form">Додати завдання</NavLink>
        </div>
        <div style={{ margin: '10px' }}>
          <NavLink className={s.MenuItem} style={{ textDecoration: 'none' }} to="/login">Увійти</NavLink>
        </div>
      </MenuList>
    </MenuContainer>
  );
};

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};




export default Menu;