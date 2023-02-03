import React, {useState} from "react";
import styled from 'styled-components';
import {Button} from "react-bootstrap";
import {BTN_CHANGE} from "../constants/gameMessages";

const commonClasses = 'd-inline-block mb-2 p-2'

export const GameMessageBubble = styled.div
  .attrs({className: `${commonClasses} text-body`})`
  font-size: 0.875rem;
  background: #eee;
  border-radius: 0 1rem 1rem 1rem;
`;

const UserMessage = styled.div
  .attrs({className: `${commonClasses} text-white bg-primary`})`
  font-size: 0.875rem;
  border-radius: 1rem 0 1rem 1rem;
`;

export const UserMessageBubble = ({onClick, children}) => {
  const [hover, setHover] = useState(false);

  return (
    <div className='d-flex flex-row-reverse w-100'
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <UserMessage>
          {children}
      </UserMessage>
      {hover
        ? <Button onClick={() => onClick()}
            size="sm"
            className='text-primary bg-transparent border-0 p-2 mb-2'>
            <strong>{BTN_CHANGE}</strong>
          </Button>
        : null}
    </div>
  );
}
