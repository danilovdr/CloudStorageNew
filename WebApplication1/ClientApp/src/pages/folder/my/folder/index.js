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
import Settings from '../../../../components/header/settings';

const FolderIcon = (props) => {
    const iconStyle = {
        width: "100px"
    };

    const history = useHistory();

    const [dropdown, setDropdown] = useState(false);
    const dropdownToggle = () => setDropdown(!dropdown);

    const [settings, settingsOpen] = useState(false);
    const [rename, renameOpen] = useState(false);

    const onClick = () => {
        history.push("/folder/my/" + props.id);
    };

    const onContextMenu = event => {
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
                    <DropdownItem onClick={() => settingsOpen(true)}>
                        Настройки
                    </DropdownItem>
                    <DropdownItem onClick={() => renameOpen(true)}>
                        Переименовать
                    </DropdownItem>
                    <DropdownItem>
                        Удалить
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <Settings
                isOpen={settings}
                setIsOpen={settingsOpen}
                id={props.id}
            />
        </>
    )
}

export default FolderIcon;