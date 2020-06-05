import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import { account } from '../../../api';
import Folder from './folder';
import File from './file';
import useFolders from './useFolders';
import useFiles from './useFiles';

const SharedFolder = (props) => {
    const history = useHistory();
    const [currentFolder, setCurrentFolder] = useState(null);

    const [folders, foldersApi] = useFolders(currentFolder);
    const [files, filesApi] = useFiles(currentFolder);

    useEffect(() => {
        const isAuthorize = () => {
            return account.isAuthorize()
                .then(resp => resp.json())
                .then(json => {
                    if (!json)
                        throw new Error();
                })
        }

        if (props.match.params.id !== undefined)
            setCurrentFolder(props.match.params.id);

        isAuthorize()
            .then(() => {
                foldersApi.fetch()
                filesApi.fetch();
            })
            .catch(() => history.push("/authorize"))
    }, []);

    return (
        <div className="w-100 d-flex justify-content-start flex-wrap">
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
    );
}

export default SharedFolder;