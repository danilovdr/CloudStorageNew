import { useState } from "react"
import { folder } from '../../../api';

const useFolders = (id) => {
    const [folders, setFolders] = useState([]);

    const fetch = () => {
        let folderId = id == null ? "" : id
        folder.getMyFolder(folderId)
            .then(resp => resp.json())
            .then(json => setFolders(json));
    }

    const add = (folder = {}) => {
        folder.create(folder.name, folder.parentId)
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                        .then(json => {
                            let old = [...folders];
                            old.push(json);
                            setFolders(old);
                        });
                } else {
                    throw new Error();
                }
            })
    }

    const remove = (id) => {
        folder.remove(id)
            .then(resp => {
                if (resp.ok) {
                    let old = [...folders];
                    setFolders(old.filter(p => p.id !== id))
                } else {
                    throw new Error();
                }
            })
    }

    return [
        folders,
        {
            fetch: fetch,
            add: add,
            remove: remove
        }
    ]
}

export default useFolders;