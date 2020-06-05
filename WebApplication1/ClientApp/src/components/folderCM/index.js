import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'reactstrap';

const FolderCM = (props) => {
    if (props.isOpen)
        return (
            <ButtonGroup
                vertical
                className="position-absolute"
                style={props.position}
            >
                <Button>1</Button>
                <Button>2</Button>
                <Button>3</Button>
            </ButtonGroup>
        )

    return (
        <></>
    )
}

export default FolderCM;