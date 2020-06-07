import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import img from '../../../../img/folder.png';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import Settings from './settings';
import ConfirmRemove from './confirmRemove';

const Folder = (props) => {
    const iconStyle = {
        width: "100px"
    };

    const history = useHistory();

    const [dropdown, setDropdown] = useState(false);
    const dropdownToggle = () => setDropdown(!dropdown);

    const [confirmRemove, confirmRemoveOpen] = useState(false);
    const confirmRemoveToggle = () => confirmRemoveOpen(!confirmRemove);

    const [settings, settingsOpen] = useState(false);
    const settingsToggle = () => settingsOpen(!settings);

    const remove = (event) => {
        confirmRemoveToggle();
        event.stopPropagation()
    }

    const onClick = () => {
        history.push("/folder/my/" + props.id);
    };

    const onContextMenu = (event) => {
        event.preventDefault();
        dropdownToggle();
        event.stopPropagation()
    };

    return (
        <>
            <Dropdown
                style={iconStyle}
                isOpen={dropdown}
                toggle={dropdownToggle}
                onClick={onClick}
                onContextMenu={onContextMenu}
            >
                <DropdownToggle color="link">
                    <img className="w-100" src={img} alt="folder" />
                    {props.name}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={settingsToggle}>
                        Настройки
                    </DropdownItem>
                    <DropdownItem onClick={remove}>
                        Удалить
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {/* Settings */}
            <Settings
                id={props.id}
                isOpen={settings}
                toggle={settingsToggle}
            />
            {/* Remove */}
            <ConfirmRemove
                id={props.id}
                isOpen={confirmRemove}
                toggle={confirmRemoveToggle}
                remove={props.remove}
            />
        </>
    )
}

export default Folder;