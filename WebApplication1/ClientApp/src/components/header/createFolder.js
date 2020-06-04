import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { folder } from '../../api';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    Label,
    Alert,
} from 'reactstrap';

const CreateFolder = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const [name, setName] = useState("");
    const [errorText, setErrorText] = useState("");
    const [errorVisible, setErrorVisible] = useState(false);

    const showError = text => {
        setErrorText(text);
        setErrorVisible(true);
    }

    const hiddenError = () => {
        setErrorText("");
        setErrorVisible(false);
    }

    const submit = () => {
        hiddenError();
        folder.create(name, props.folder)
            .then(resp => {
                if (resp.ok) {
                    close();
                    resp.json().then(json => props.addFolder(json));
                } else {
                    resp.json().then(json => showError(json.title));
                }
            })

    };

    const close = () => {
        hiddenError();
        setName("");
        setIsOpen(false)
    }

    return (
        <>
            <Button
                className="ml-3"
                color="info"
                onClick={toggleIsOpen}>
                Создать папку
            </Button>
            <Modal isOpen={isOpen}>
                <ModalHeader>Создать папку</ModalHeader>
                <ModalBody>
                    <Alert color="danger" hidden={!errorVisible}>{errorText}</Alert>
                    <Label>Название
                    <Input onChange={e => setName(e.target.value)} />
                    </Label>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={submit}>Создать</Button>
                    <Button onClick={close}>Закрыть</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default CreateFolder;