import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { account, folder, file } from '../../../api';
import Folder from './folder/';
import File from './file/';
import ContextMenu from './contextMenu/';

const MyFolder = (props) => {
    const style = {
        height: "800px"
    };

    const history = useHistory();
    const [currentFolder, setCurrentFolder] = useState(null);

    const [folders, setFolders] = useState([]);
    const [files, setFiles] = useState([]);

    const [context, contextOpen] = useState(false);
    const contextToggle = () => contextOpen(!context);

    const [contextCoords, setContextCoords] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        console.log("fetch data");
        const isAuthorize = () => {
            return account.isAuthorize()
                .then(resp => resp.json())
                .then(json => {
                    if (!json)
                        history.push("/authorize")
                })
        }

        const getFolders = (id) => {
            folder.getMyFolder(id)
                .then(resp => resp.json())
                .then(json => setFolders(json));
        }

        const getFiles = (id) => {
            file.getMyFiles(id)
                .then(resp => resp.json())
                .then(json => setFiles(json));
        }

        if (props.match.params.id !== undefined)
            setCurrentFolder(props.match.params.id);

        isAuthorize().then(() => {
            let id = props.match.params.id === undefined ? "" : props.match.params.id;
            getFolders(id);
            getFiles(id);
        })
    }, []);

    const addFile = (file = {}) => {
        let old = [...files];
        old.push(file);
        setFiles(old);
    }

    const updateFile = (file = {}) => {
        let old = [...files];
        let updatedFile = old.find(p => p.id === file.id);
        updatedFile.id = file.id;
        updatedFile.name = file.name;
        updatedFile.content = file.content;
        updatedFile.parentId = file.parentId;
        setFiles(old);
    }

    const removeFile = (id) => {
        let old = [...files];
        setFiles(old.filter(p => p.id !== id));
    }

    const addFolder = (folder = {}) => {
        let old = [...folders];
        old.push(folder);
        setFolders(old);
    }

    const removeFolder = (id) => {
        let old = [...folders];
        setFolders(old.filter(p => p.id !== id))
    }

    const onClick = () => {
        contextOpen(false);
    }

    const onContextMenu = (event) => {
        event.preventDefault();
        setContextCoords({
            left: event.clientX,
            top: event.clientY
        })
        contextOpen(true);
    }

    return (
        <>
            <div
                style={style}
                className="w-100 d-flex justify-content-start flex-wrap"
                onClick={onClick}
                onContextMenu={onContextMenu}
            >
                {folders.map(item =>
                    <Folder
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        remove={removeFolder}
                    />)}
                {files.map(item =>
                    <File
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        parentId={currentFolder}
                        update={updateFile}
                        remove={removeFile}
                    />)}
            </div>
            <ContextMenu
                id={currentFolder}
                isOpen={context}
                toggle={contextToggle}
                coords={contextCoords}
                addFile={addFile}
                addFolder={addFolder}
            />
        </>
    );
}

export default MyFolder;