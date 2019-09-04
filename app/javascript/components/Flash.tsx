import * as React from 'react';
import style from 'styled-components';
import EventBus from "utils/EventBus";


const flash = (type: FlashType, message: string) => {
    EventBus.emit('flash', ({type: type, message: message}));
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
}

enum FlashType {
    Dismissed,
    Success,
    Error
}

export const FlashComponent = () => {
    let [visibility, setVisibility] = React.useState(false);
    let [message, setMessage] = React.useState<string>('');
    let [type, setType] = React.useState<FlashType>(FlashType.Dismissed);

    React.useEffect(() => {
        EventBus.on('flash', (msg) => {
            const {type, message} = msg;
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
        visibility && <MessageContainer type={type}>
            <CloseButton className={'close'}><strong>☓</strong></CloseButton>
            <Message>{message}</Message>
        </MessageContainer>
    )
};

const MessageContainer = style.div`
    color: white;
    border-radius: 10px;
    position: absolute;
    top: 50px;
    right: 10px;
    padding: 20px;
    display: flex;
    align-items: center;
    z-index: 1;
    ${props => {
    console.log(`props: ${props.type}`);
    switch (props.type) {
        case FlashType.Dismissed:
            return 'visibility: hidden;';
        case FlashType.Success:
            return 'background-color: lightgreen;';
        case FlashType.Error:
            return 'background-color: lightcoral;';
    }
}}
`;

const Message = style.p`
    margin: 0;
`;

const CloseButton = style.span`
    color: white;
    cursor: pointer;
    margin-right: 10px;
`;