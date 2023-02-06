import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const TableButton = ({onClick,enabled}) => (
  <Button onClick={() => onClick()} variant={"outline-secondary"}
    active={enabled}
    title="Table view">
    <FontAwesome name='fas fa-table'/>
  </Button>
);
export default TableButton;