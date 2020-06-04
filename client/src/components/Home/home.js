import React, {useState, useRef} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from '../../global';
import { theme } from '../Themes/theme';

import { useOnClickOutside } from '../../hooks';
import Burger from '../Burger/burger';
import Menu from '../Menu/menu';
import FocusLock from 'react-focus-lock';

function Home() {
    const [open, setOpen] = useState(false);
    const node = useRef();
    const menuId = "main-menu";

    useOnClickOutside(node, () => setOpen(false));

    return(
        <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Burger></Burger>
        <div ref={node}>
          <FocusLock disabled={!open}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <Menu open={open} setOpen={setOpen} id={menuId} />
          </FocusLock>
        </div>
        <div>
          <h1>Hello. Welcome to Voyage Planner!</h1>
        </div>
        
      </>
    </ThemeProvider>
    )
}

export default Home;