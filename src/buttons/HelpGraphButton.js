import React from 'react';
import {Button} from "react-bootstrap";
import FontAwesome from "react-fontawesome";

const HelpGraphButton = ({setCollapseHelpGraphButton,collapseHelpGraphButton}) => (
    <div>
        <Button variant={'outline-info'} title='Help on the graph view' size='md'
                onClick={() => setCollapseHelpGraphButton(!collapseHelpGraphButton)}
                aria-controls="help-graph"
                aria-expanded={collapseHelpGraphButton}
                active={collapseHelpGraphButton}>
            <FontAwesome name='fas fa-question'/>
            <span className='d-none d-lg-inline'>&nbsp;Graph help</span>
        </Button>
    </div>
);

export default HelpGraphButton;