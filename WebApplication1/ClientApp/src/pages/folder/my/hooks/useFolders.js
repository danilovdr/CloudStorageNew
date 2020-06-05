import { useState, useEffect } from "react"
import { folder } from '../../../../api'

const useFolders = (id) => {
    const [folders, setFolders] = useState([]);

    useEffect(() => {
        const fetch = () => {
            let folderId = id == null ? "" : id
            folder.getMyFolder(folderId)
                .then(resp => resp.json())
                .then(json => setFolders(json));
        }
        fetch();
    }, [])

    const add = (folder = {}) => {
        let old = [...folders];
        old.push(folder);
        setFolders(old);
    }

    const remove = (id) => {
        let old = [...folders];
        setFolders(old.filter(p => p.id !== id))
    }

    return [
        folders,
        {
            add: add,
            remove: remove
        }
    ]
}

export default useFolders;