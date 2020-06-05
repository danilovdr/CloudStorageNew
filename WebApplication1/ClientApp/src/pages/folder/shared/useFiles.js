import { useState } from "react";
import { file } from '../../../api';

const useFiles = (parentId) => {
    const [files, setFiles] = useState([]);

    const fetch = () => {
        let folderId = parentId == null ? "" : parentId
        file.getMyFiles(folderId)
            .then(resp => resp.json())
            .then(json => setFiles(json));
    }

    const add = (file = {}) => {
        file.create(file.name, file.content, file.parentId)
            .then(resp => {
                if (!resp.ok)
                    throw new Error();
            })
            .then(json => {
                let old = [...files];
                old.push(json);
                setFiles(old);
            });
    }

    const update = (file = {}) => {
        file.update(file.id, file.name, file.content, file.parentId)
            .then(resp => resp.json())
            .then(json => {
                let old = [...files];
                let updatedFile = old.find(p => p.id === file.id);
                updatedFile.id = json.id;
                updatedFile.name = json.name;
                updatedFile.content = json.content;
                updatedFile.parentId = json.parentId;
                setFiles(old);
            })
    }

    const remove = (id) => {
        file.remove(id)
            .then(resp => {
                if (resp.ok) {
                    let old = [...files];
                    setFiles(old.filter(p => p.id !== id));
                }
            })
    }

    return [
        files,
        {
            fetch: fetch,
            add: add,
            update: update,
            remove: remove
        }
    ]
}

export default useFiles;