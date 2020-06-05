import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { permission } from '../../api';
import {
    Modal,
    ModalHeader,
    ModalFooter,
    Button,
    Input,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    ModalBody,
    Table
} from 'reactstrap';
import Permission from '../permission';

const Settings = (props) => {
    const modalStyle = {
        maxWidth: "650px",
        width: '650px'
    };

    const btnStyle = {
        width: '150px',
    };

    const [username, setUsername] = useState("");
    const [permissionValue, setPermission] = useState("Access");

    const getPermission = () => permissionValue === "Access"
        ? "Просмотр"
        : "Редактирование"

    const togglePermission = permission => permission === "Просмотр"
        ? setPermission("Access")
        : setPermission("Edit")

    const addPermission = () => {
        permission.add(props.id, username, permissionValue);
    };

    const [accessUsers, setAccessUsers] = useState([]);
    const [editUsers, setEditUsers] = useState([]);

    useEffect(() => {
        const getUsers = () => {
            if (props.isOpen)
                permission.getFolderUsers(props.id)
                    .then(resp => resp.json())
                    .then(json => {
                        setAccessUsers(json.access);
                        setEditUsers(json.edit);
                    });
        }
        getUsers();
    }, [props.isOpen]);

    return (
        <Modal style={modalStyle} isOpen={props.isOpen}>
            <ModalHeader>Настройки</ModalHeader>
            <ModalBody>
                <Table>
                    <thead>
                        <tr>
                            <th>
                                <Input className="w-100" placeholder="Имя пользователя.." onChange={e => setUsername(e.target.value)} />
                            </th>
                            <th>
                                <UncontrolledDropdown>
                                    <DropdownToggle style={btnStyle}>
                                        {getPermission()}
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        <DropdownItem onClick={() => togglePermission("Просмотр")}>
                                            Просмотр
                                        </DropdownItem>
                                        <DropdownItem onClick={() => togglePermission("Редактирование")}>
                                            Редактирование
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </th>
                            <th>
                                <Button style={btnStyle} onClick={addPermission}>
                                    Добавить
                                    </Button>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {accessUsers.map(user =>
                            <Permission
                                key={user.id}
                                permission="Access"
                                name={user.name}
                            />)}
                        {editUsers.map(user =>
                            <Permission
                                key={user.id}
                                permission="Edit"
                                name={user.name}
                            />)}
                    </tbody>
                </Table>
            </ModalBody>
            <ModalFooter>
                <Button outline onClick={props.toggle}>
                    Закрыть
                    </Button>
            </ModalFooter>
        </Modal>
    )
}

export default Settings;