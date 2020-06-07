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
    const dropdownToggle = () => {
        if (dropdown)
            dropdownOpen(false)
    }


    const [settings, settingsOpen] = useState(false);
    const settingsToggle = () => settingsOpen(!settings);

    const [confirmRemove, confirmRemoveOpen] = useState(false);
    const confirmRemoveToggle = () => confirmRemoveOpen(!confirmRemove);

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
        event.stopPropagation()
    };

    const onContextMenu = (event) => {
        event.preventDefault();
        dropdownOpen(true)
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