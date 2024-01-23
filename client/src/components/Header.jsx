import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import Button from '@mui/material/Button';
import {Link} from "react-router-dom";
import {styled} from "@mui/material";

const Styledbutton = styled(Button)`
  font-weight: 600;
`

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Keeper
      </h1>
      <Link to={'/'}>
        <Styledbutton variant="contained">Logout</Styledbutton>
      </Link>
    </header>
  );
}

export default Header;