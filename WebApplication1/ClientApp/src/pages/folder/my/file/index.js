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

const File = (props) => {
    const iconStyle = {
        width: '100px',
        height: '100px'
    };

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const [dropdown, setDropdown] = useState(false);
    const dropdownToggle = () => setDropdown(!dropdown);

    const [settings, settingsOpen] = useState(false);

    const onClick = (event) => {
        const getFile = () => {
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
        file.remove(props.id)
            .then(props.remove(props.id))
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
                    <DropdownItem>
                        Переименовать
                    </DropdownItem>
                    <DropdownItem onClick={remove}>
                        Удалить
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
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
                    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
                </ModalFooter>
            </Modal>
            <Settings
                isOpen={settings}
                setIsOpen={settingsOpen}
                id={props.id}
            />
        </>
    )
};

export default File;