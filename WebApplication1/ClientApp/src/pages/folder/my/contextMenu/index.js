import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'reactstrap';
import CreateFile from './createFile';
import CreateFolder from './createFolder';
import Settings from '../../../../components/header/settings';

const ContextMenu = (props) => {
    if (props.isOpen)
        return (
            <ButtonGroup
                vertical
                className="position-absolute"
                style={props.coords}
            >
                <CreateFile addFile={props.addFile} />
                <CreateFolder addFolder={props.addFolder} />
                <Settings id={props.id} />
            </ButtonGroup>
        )

    return (
        <></>
    )
}

export default ContextMenu;