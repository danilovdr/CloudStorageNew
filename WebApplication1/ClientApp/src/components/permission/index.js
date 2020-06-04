import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const Permission = (props) => {
    const [permission, setPermission] = useState(props.permission);

    const getPermission = () => permission === "Access"
        ? "Просмотр"
        : "Редактирование"

    const togglePermission = permission => permission === "Просмотр"
        ? setPermission("Access")
        : setPermission("Edit")

    const removePermission = () => {

    }

    return (
        <tr>
            <th>{props.name}</th>
            <td><UncontrolledDropdown>
                <DropdownToggle>
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
            </UncontrolledDropdown></td>
        </tr>
    )
}

export default Permission;