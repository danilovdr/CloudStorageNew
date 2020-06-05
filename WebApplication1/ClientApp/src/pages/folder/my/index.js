import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { account, folder, file } from '../../../api';
import Folder from './folder';
import File from './file';
import useFolders from './hooks/useFolders';
import useFiles from './hooks/useFiles';
import ContextMenu from './contextMenu/index';

const MyFolder = (props) => {
    const style = {
        height: "800px"
    };

    const history = useHistory();
    const [currentFolder, setCurrentFolder] = useState(null);

    const [folders, foldersApi] = useFolders(currentFolder);
    const [files, filesApi] = useFiles(currentFolder);

    console.log('files', files);
    console.log('fodlers', folders);

    const [context, contextOpen] = useState(false);
    const [contextCoords, setContextCoords] = useState({
        x: 0,
        y: 0
    });

    useEffect(() => {
        const isAuthorize = () => {
            return account.isAuthorize()
                .then(resp => resp.json())
                .then(json => {
                    if (!json)
                        history.push("/authorize")
                })
        }

        if (props.match.params.id !== undefined)
            setCurrentFolder(props.match.params.id);

        isAuthorize()
    }, []);

    const addFolder = (createdFolder = {}) => {
        folder.create(createdFolder)
            .then(resp => resp.json())
            .then(json => foldersApi.add(json));
    }

    const removeFolder = (id) => {
        folder.remove(id)
            .then(foldersApi.remove(id))
    }

    const addFile = (createdFile = {}) => {
        file.create(createdFile)
            .then(resp => resp.json())
            .then(json => filesApi.add(json));
    }

    const updateFile = (updatedFile = {}) => {
        file.update(updatedFile)
            .then(resp => resp.json())
            .then(json => filesApi.update(json));
    }

    const removeFile = (id) => {
        file.remove(id)
            .then(filesApi.remove(id));
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
                coords={contextCoords}
                addFile={addFile}
                addFolder={addFolder}
            />
        </>
    );
}

export default MyFolder;