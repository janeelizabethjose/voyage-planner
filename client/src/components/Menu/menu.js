import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './menu.styled';

const Menu = ({ open, ...props }) => {
  
  const isHidden = open ? true : false;
  const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🛩️</span>
        On-Going
      </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">🚋</span>
        Up-Coming
        </a>
      <a href="/" tabIndex={tabIndex}>
        <span aria-hidden="true">⌛</span>
        Bygone
        </a>
    </StyledMenu>
  )
}

Menu.propTypes = {
  open: bool.isRequired,
}

export default Menu;