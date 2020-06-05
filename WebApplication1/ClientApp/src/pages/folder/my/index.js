import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { account, folder, file } from '../../../api';
import Folder from './folder/';
import File from './file/';
import useFolders from './hooks/useFolders';
import useFiles from './hooks/useFiles';
import ContextMenu from './contextMenu/';
import CreateFolder from './contextMenu/createFolder';

const MyFolder = (props) => {
    const style = {
        height: "800px"
    };

    const history = useHistory();
    const [currentFolder, setCurrentFolder] = useState(null);

    const [folders, foldersApi] = useFolders(currentFolder);
    const [files, filesApi] = useFiles(currentFolder);

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
                        remove={foldersApi.remove}
                    />)}
                {files.map(item =>
                    <File
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        parentId={currentFolder}
                        update={filesApi.update}
                        remove={filesApi.remove}
                    />)}
            </div>
            <ContextMenu
                id={currentFolder}
                isOpen={context}
                coords={contextCoords}
                addFile={filesApi.add}
                addFolder={foldersApi.add}
            />
        </>
    );
}

export default MyFolder;