import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, Input, ModalBody, ModalFooter } from 'reactstrap';
import img from '../../../img/file.png';
import { file } from '../../../api';

const File = (props) => {
    const iconStyle = {
        width: '100px'
    };

    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [content, setContent] = useState("");

    const open = () => {
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
    };

    const update = () => {
        let updatedFile = {
            id: props.id,
            name: name,
            content: content,
            parentId: props.parentId
        };
        props.update(updatedFile)
    };

    const remove = () => {
        props.remove(props.id);
        setIsOpen(false);
    };

    return (
        <>
            <Button
                style={iconStyle}
                color="link"
                onClick={open}
            >
                <img className="w-100" src={img} alt="file" />
                {props.name}
            </Button>
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
                    <Button color="danger" onClick={remove}>Удалить</Button>
                    <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
                </ModalFooter>
            </Modal>
        </>
    )
};

export default File;