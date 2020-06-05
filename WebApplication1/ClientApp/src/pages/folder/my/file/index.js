import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    Modal,
    ModalHeader,
    Input,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import img from '../../../../img/file.png';
import { file } from '../../../../api';
import Settings from '../../../../components/header/settings';
import ConfirmRemove from './confirmRemove';

const File = (props) => {
    const iconStyle = {
        width: '100px',
        height: '100px'
    };

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const [dropdown, dropdownOpen] = useState(false);
    const dropdownToggle = () => dropdownOpen(!dropdown);

    const [settings, settingsOpen] = useState(false);
    const settingsToggle = () => settingsOpen(!settings);

    const [confirmRemove, confirmRemoveOpen] = useState(false);
    const confirmRemoveToggle = () => confirmRemoveOpen(!confirmRemove);

    const onClick = (event) => {
        const getFile = () => {
            event.stopPropagation()
            file.get(props.id)
                .then(resp => resp.json())
                .then(json => {
                    setName(json.name);
                    setContent(json.content);
                });
        }
        getFile();
        setIsOpen(true);
    };

    const onContextMenu = (event) => {
        event.preventDefault();
        dropdownToggle();
        event.stopPropagation()
    }

    const update = () => {
        let updatedFile = {
            id: props.id,
            name: name,
            content: content,
            parentId: props.parentId
        };
        file.update(updatedFile)
            .then(props.update(updatedFile))
    };

    const remove = (event) => {
        confirmRemoveToggle();
        event.stopPropagation()
    }

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
            {/* View */}
            <Modal isOpen={isOpen}>
                <ModalHeader>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </ModalHeader>
                <ModalBody>
                    <Input
                        type="textarea"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button color="info" onClick={update}>Сохранить</Button>
                    <Button onClick={toggle}>Закрыть</Button>
                </ModalFooter>
            </Modal>
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
};

export default File;