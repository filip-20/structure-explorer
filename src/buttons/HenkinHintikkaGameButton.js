import React from 'react';
import FontAwesome from 'react-fontawesome';
import {Button} from "react-bootstrap";

const HenkinHintikkaGameButton = ({onClick, enabled}) => (
    <Button size="sm" onClick={() => onClick()}
        variant={"outline-secondary"}
        active={enabled}
        title={`${ enabled ? 'End' : 'Start' } Henkin-Hintikka game`}>
        <FontAwesome name='fas fa-gamepad'/>
    </Button>
);
export default HenkinHintikkaGameButton;