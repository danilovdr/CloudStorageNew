import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ButtonGroup, Button } from 'reactstrap';
import CreateFile from './createFile';
import CreateFolder from './createFolder';
import Settings from '../../../../components/header/settings';

const ContextMenu = (props) => {
    const [createFolder, createFolderOpen] = useState(false);
    const createFolderToggle = () => createFolderOpen(!createFolder);
    const openCreateFolder = () => {
        createFolderToggle();
        props.toggle();
    }

    const [createFile, createFileOpen] = useState(false);
    const createFileToggle = () => createFileOpen(!createFile);
    const openCreateFile = () => {
        createFileToggle();
        props.toggle();
    }

    const [settings, settingsOpen] = useState(false);
    const settingsToggle = () => settingsOpen(!settings);
    const openSettings = () => {
        settingsToggle();
        props.toggle();
    }


    if (props.isOpen)
        return (
            <>
                <ButtonGroup
                    vertical
                    className="position-absolute"
                    style={props.coords}
                >
                    <Button
                        color="info"
                        onClick={openCreateFile}
                        value='Создать файл'
                    >
                        Создать файл
                    </Button>
                    <Button
                        color="info"
                        onClick={openCreateFolder}
                    >
                        Создать папку
                    </Button>
                    <Button
                        color="info"
                        onClick={openSettings}
                    >
                        Настройки
                    </Button>
                </ButtonGroup>
                <CreateFile
                    id={props.id}
                    addFile={props.addFile}
                    isOpen={createFile}
                    toggle={createFileToggle}
                />
                <CreateFolder
                    id={props.id}
                    addFolder={props.addFolder}
                    isOpen={createFolder}
                    toggle={createFolderToggle}
                />
                <Settings
                    id={props.id}
                    isOpen={settings}
                    toggle={settingsToggle}
                />
            </>
        )

    return (
        <>
            <CreateFile
                id={props.id}
                addFile={props.addFile}
                isOpen={createFile}
                toggle={createFileToggle}
            />
            <CreateFolder
                id={props.id}
                addFolder={props.addFolder}
                isOpen={createFolder}
                toggle={createFolderToggle}
            />
            <Settings
                id={props.id}
                isOpen={settings}
                toggle={settingsToggle}
            />
        </>
    )
}

export default ContextMenu;