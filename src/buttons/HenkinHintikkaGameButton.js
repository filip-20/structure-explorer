import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const HenkinHintikkaGameButton = ({onClick, gameEnabled, disabled}) => (
    <Button size="sm" onClick={() => onClick()}
        variant={"outline-secondary"}
        active={gameEnabled}
        disabled={disabled}
        title={`${ gameEnabled ? 'End' : 'Start' } Henkin-Hintikka game`}>
        <FontAwesome name='fas fa-gamepad'/>
    </Button>
);
export default HenkinHintikkaGameButton;