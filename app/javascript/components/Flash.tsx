import * as React from 'react';
import style from 'styled-components';
import EventBus from "utils/EventBus";


const flash = (type:FlashType, message: string) => {
    EventBus.emit('flash', ({type: type, message: message}));
};

export const success = (message: string) => {
    flash(FlashType.Success, message);
};

export const error = (message: string) => {
    flash(FlashType.Error, message);
};

enum FlashType {
    Success,
    Error
}

export const FlashComponent = () => {
    let [visibility, setVisibility] = React.useState(false);
    let [message, setMessage] = React.useState('');
    let [type, setType] = React.useState('');

    React.useEffect(() => {
        EventBus.addListener('flash', ({type, message}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
        });


    }, []);

    React.useEffect(() => {
        if (document.querySelector('.close') !== null) {
            document.querySelector('.close').addEventListener('click', () => setVisibility(false));
        }
    });

    return (
        visibility && <MessageContainer type={{type}}>
            <CloseButton class={'close'}><strong>X</strong></CloseButton>
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
    z-index: 1111;
    ${props => {
    switch (props.type) {
        case FlashType.Success:
            return 'background: lightgreen;';
        case FlashType.Error:
            return 'background: lightcoral;';
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