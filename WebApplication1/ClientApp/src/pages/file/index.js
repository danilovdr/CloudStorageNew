import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Button,
    ModalFooter
} from 'reactstrap';
import img from '../../img/file.png';
import { url } from '../../configuration';

const File = (props) => {
    const iconStyle = {
        width: "100px"
    };

    const [name, setName] = useState("");
    const [content, setContent] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const open = () => {
        fetch(url + "file/" + props.info.id)
            .then(resp => resp.json())
            .then(json => {
                setName(json.name);
                setContent(json.content);
                setIsOpen(true);
            });
    };

    const update = () => {
        fetch(url + "file/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Id: props.info.id,
                Name: name,
                Content: content,
                ParentFolderId: props.parentFolderId
            })
        })
            .then(resp => resp.json())
            .then(json => {
                setName(json.name)
                setContent(json.content);
            })
    }

    const close = () => {
        setIsOpen(false);
        setName(props.info.name);
        setContent(props.info.content);
    };

    return (
        <>
            {/* Icon */}
            <Button
                style={iconStyle}
                color="link"
                onClick={open}
            >
                <img className="w-100" src={img} alt="file" />
                <p>{props.info.name}</p>
            </Button>
            {/* Modal */}
            <Modal isOpen={isOpen}>
                <ModalHeader>
                    <Input
                        type="text"
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
                    <Button onClick={update}>Сохранить</Button>
                    <Button onClick={close}>Закрыть</Button>
                </ModalFooter>
            </Modal>
        </>

    );
};

export default File;