import React from 'react';
import {Button} from "react-bootstrap";
import FontAwesome from "react-fontawesome";
import { OverlayTrigger, Popover } from "react-bootstrap";

const HelpButton = ({subject, children, ...props}) => (
  <Button style={{padding:"0.2rem 0.4rem"}}
      variant='outline-info'
      title={`Help${ subject ? ` on ${subject}` : ''}`}
      {...props}>
      <FontAwesome name='fas fa-question'/>{children ? <>&nbsp;{children}</> : null}
  </Button>
);

export function Help({ subject, placement = 'auto', show, onToggle, children, label, size = 'sm' }) {
  const helpPopover = (
    <Popover id={`help-${subject}`}
      className='mw-100 overflow-auto shadow-sm'
      style={{width: '30rem', maxHeight: '90vh'}}>
        <Popover.Content>
            {children}
        </Popover.Content>
    </Popover>
  );
  return (
    <OverlayTrigger trigger="click"
        placement={placement}
        overlay={helpPopover}
        show={show}
        onToggle={onToggle}>
        <HelpButton subject={subject}
          active={show}
          onClick={() => onToggle(!show)}
          size={size}>
          {label}
        </HelpButton>
    </OverlayTrigger>
  );
}

export default Help;
