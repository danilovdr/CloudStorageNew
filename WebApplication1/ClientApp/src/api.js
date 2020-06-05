const url = 'https://localhost';
const port = '5001';
const getUrl = () => url + ":" + port + "/api/";

export const account = {
    register: (name, password, confirmPassword) => {
        return fetch(getUrl() + "account/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: name,
                Password: password,
                ConfirmPassword: confirmPassword
            })
        })
    },
    login: (name, password) => {
        return fetch(getUrl() + "account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: name,
                Password: password
            })
        })
    },
    logout: () => {
        return fetch(getUrl() + "account/logout")
    },
    isAuthorize: () => {
        return fetch(getUrl() + "account/isAuthorize")
    }
}

export const file = {
    create: (name, content, folder) => {
        return fetch(getUrl() + "file/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: name,
                Content: content,
                ParentId: folder
            })
        })
    },
    getMyFiles: (parentId) => {
        return fetch(getUrl() + "file/my/" + parentId)
    },
    getSharedFiles: (parentId) => {
        return fetch(getUrl(), "file/shared/" + parentId)
    },
    update: (file = {}) => {
        return fetch(getUrl() + "file/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Id: file.id,
                Name: file.name,
                Content: file.content,
                ParentId: file.parentId
            })
        })
    },
    remove: (id) => {
        return fetch(getUrl() + "file/" + id, {
            method: "DELETE"
        })
    },
    get: (id) => {
        return fetch(getUrl() + "file/" + id)
    }
}

export const folder = {
    create: (name, folder) => {
        return fetch(getUrl() + "folder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Name: name,
                ParentId: folder
            })
        })
    },
    getMyFolder: (id) => {
        return fetch(getUrl() + "folder/my/" + id)
    },
    getSharedFolder: (id) => {
        return fetch(getUrl() + "folder/shared/" + id)
    },
    remove: id => {
        return fetch(getUrl() + "folder/" + id, {
            method: "DELETE"
        });
    }
}

export const permission = {
    add: (id, username, permission) => {
        return fetch(getUrl() + 'permission/folder/' + id, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Username: username,
                Permission: permission
            })
        })
    },
    getFolderUsers: (id) => {
        return fetch(getUrl() + "permission/folder/" + id + "/users");
    },
    getFileUsers: (id) => {
        return fetch(getUrl() + "permission/file/" + id + "/users");
    }
}