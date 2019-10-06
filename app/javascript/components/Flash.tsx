import * as React from 'react';
import style from 'styled-components';
import EventBus from 'utils/EventBus';
import * as bs from 'react-bootstrap';

enum FlashType {
  Dismissed,
  Success,
  Error,
}

const flash = (type: FlashType, message: string) => {
  EventBus.emit('flash', { type: type, message: message });
};

export const success = (message: string) => {
  console.info(`Flash Success: ${message}`);
  flash(FlashType.Success, message);
};

export const error = (message: string) => {
  console.warn(`Flash Error: ${message}`);
  flash(FlashType.Error, message);
};

export const dismiss = () => {
  console.warn(`Flash Dismiss`);
  flash(FlashType.Dismissed, '');
};

export const FlashComponent = () => {
  const [visibility, setVisibility] = React.useState(false);
  const [message, setMessage] = React.useState<string>('');
  const [type, setType] = React.useState<FlashType>(FlashType.Dismissed);

  React.useEffect(() => {
    EventBus.on('flash', msg => {
      const { type, message } = msg;
      console.log(`Flash listened flash event. ${JSON.stringify(msg)}`);
      if (type != FlashType.Dismissed) {
        setVisibility(true);
        setMessage(message);
        setType(type);
        setTimeout(() => {
          setVisibility(false);
        }, 4000);
      } else {
        setVisibility(false);
        setMessage('');
        setType(FlashType.Dismissed);
      }
    });
  }, []);

  React.useEffect(() => {
    const closeButton = document.querySelector('.close');
    if (closeButton) {
      closeButton.addEventListener('click', dismiss);
    }
  });

  console.log(`[Flash]visibility: ${visibility}, type: ${type}, message: ${message}`);
  return (
    visibility && (
      <MessageContainer type={type}>
        <CloseButton className={'close'}>
          <strong>☓</strong>
        </CloseButton>
        <Message>{message}</Message>
      </MessageContainer>
    )
  );
};

const MessageContainer = (props: any) => {
  switch (props.type) {
    case FlashType.Dismissed:
      return <></>;
    case FlashType.Success:
      return <bs.Alert variant={'success'}>{props.children}</bs.Alert>;
    case FlashType.Error:
      return <bs.Alert variant={'danger'}>{props.children}</bs.Alert>;
  }
};

const Message = style.p`
    margin: 0;
`;

const CloseButton = style.span`
    color: white;
    cursor: pointer;
    margin-right: 10px;
`;
