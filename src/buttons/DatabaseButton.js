import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const DatabaseButton = ({onClick,enabled}) => (
    <Button onClick={() => onClick()} variant={"outline-secondary"}
        active={enabled}
        title="Database table view">
        <FontAwesome name='fas fa-server'/>
    </Button>
);

export default DatabaseButton;