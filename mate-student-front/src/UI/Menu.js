import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
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
  @media (max-width: 768px) {
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  }
`;

const Menu = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <MenuContainer>
      <MenuToggle onClick={handleMenuToggle}>
        <i className={`fa ${isMenuOpen ? 'fa-times' : 'fa-bars'}`} />
      </MenuToggle>
      <MenuList isOpen={isMenuOpen}>
        {links.map((link, index) => (
          <MenuItem key={index}>
            <Link style={{color: 'black', fontSize: '16'}} to={link.to}>{link.label}</Link>
          </MenuItem>
        ))}
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


// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Menu links={menuLinks} />
//         <Routes>
//           {/* Your other routes here */}
//           <Route path="/profile" >Profile Page</Route>
//           <Route path="/new-tasks">New Tasks Page</Route>
//           <Route path="/waiting-response">Waiting Response Page</Route>
//           <Route path="/my-tasks">My Tasks Page</Route>
//           <Route path="/task-form">Task Form Page</Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// };

export default Menu;