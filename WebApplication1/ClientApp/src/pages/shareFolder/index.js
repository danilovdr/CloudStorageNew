import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Modal, ModalBody, Button, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import { account, folder } from '../../api';
import Header from '../../components/header';
import Sidebar from '../../components/sidebar';
import Folder from '../../components/folder';
import File from '../../components/file';
import FolderCM from '../../components/folderCM';

const SharedFolder = (props) => {
    const history = useHistory();
    const [currentFolder, setCurrentFolder] = useState(null);
    const [context, ContextOpen] = useState(false);
    const [contextPosition, setContextPosition] = useState({
        left: 0,
        top: 0
    })

    useEffect(() => {
        const isAuthorize = () => {
            return account.isAuthorize()
                .then(resp => resp.json())
                .then(json => {
                    if (!json)
                        throw new Error();
                })
        }

        const getItems = () => {
            let id = props.match.params.id === undefined
                ? ""
                : props.match.params.id

            folder.getSharedFolder(id)
                .then(resp => resp.json())
                .then(json => {
                    setFolders(json.folders);
                    setFiles(json.files)
                })
        }

        if (props.match.params.id !== undefined)
            setCurrentFolder(props.match.params.id);

        isAuthorize()
            .then(getItems)
            .catch(() => history.push("/authorize"))
    }, []);

    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    const addFolder = (folder = {}) => {
        let old = [...folders];
        old.push(folder);
        setFolders(old);
    }

    const deleteFolder = (id) => {
        let old = [...folders];
        setFolders(old.filter(p => p.id !== id))
    }

    const addFile = (file = {}) => {
        let old = [...files];
        old.push(file);
        setFiles(old);
    }

    const deleteFile = (id) => {
        let old = [...files];
        setFiles(old.filter(p => p.id !== id));
    }

    const contextMenu = e => {
        e.preventDefault();
        let x = e.clientX;
        let y = e.clientY;
        setContextPosition({
            left: x,
            top: y
        });
        ContextOpen(true);
        console.log(e.target);
    }

    return (
        <>
            <Header
                folder={currentFolder}
                addFile={addFile}
                addFolder={addFolder}
            />
            <Container fluid>
                <div className="d-flex justify-content-between">
                    <Sidebar />
                    <div className="w-100 d-flex justify-content-start flex-wrap"
                        onClick={() => ContextOpen(false)}
                        onContextMenu={contextMenu}>
                        {folders.map(item =>
                            <Folder
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                deleteFolder={deleteFolder}
                            />)}
                        {files.map(item =>
                            <File
                                key={item.id}
                                info={item}
                                deleteFile={deleteFile}
                            />)}
                    </div>
                </div>
            </Container>
            <FolderCM
                isOpen={context}
                position={contextPosition}
            />
        </>
    );
}

export default SharedFolder;