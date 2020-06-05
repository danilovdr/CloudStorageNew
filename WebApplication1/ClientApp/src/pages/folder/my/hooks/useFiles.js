import { useState, useEffect } from "react";
import { file } from '../../../../api';

const useFiles = (parentId) => {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        const fetch = () => {
            let folderId = parentId == null ? "" : parentId
            file.getMyFiles(folderId)
                .then(resp => resp.json())
                .then(json => setFiles(json));
        }
        fetch();
    }, [])

    const add = (file = {}) => {
        let old = [...files];
        old.push(file);
        setFiles(old);
    }

    const update = (file = {}) => {
        let old = [...files];
        let updatedFile = old.find(p => p.id === file.id);
        updatedFile.id = file.id;
        updatedFile.name = file.name;
        updatedFile.content = file.content;
        updatedFile.parentId = file.parentId;
        setFiles(old);
    }

    const remove = (id) => {
        let old = [...files];
        setFiles(old.filter(p => p.id !== id));
    }

    return [
        files,
        {
            add: add,
            update: update,
            remove: remove
        }
    ]
}

export default useFiles;