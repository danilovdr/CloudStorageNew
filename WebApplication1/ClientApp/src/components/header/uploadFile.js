import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    ModalFooter,
    Button,
    Label,
    Alert,
    DropdownItem,
    InputGroup,
} from 'reactstrap';
import { url } from '../../configuration';

const UploadFile = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleIsOpen = () => setIsOpen(!isOpen);

    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

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
                Загрузить файл
            </Button>
            <Modal isOpen={isOpen}>
                <ModalHeader>Загрузить файл</ModalHeader>
                <ModalBody>
                    <InputGroup>
                        <Alert color="danger" hidden={!errorVisible}>{errorText}</Alert>
                        <Label>Название
                            <Input onChange={e => setName(e.target.files[0])} />
                        </Label>
                    </InputGroup>
                    <InputGroup>
                        <Label>
                            <Input type='file' onChange={e => setFile(e.target.value)} />
                        </Label>
                    </InputGroup>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={submit}>Создать</Button>
                    <Button onClick={close}>Закрыть</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

export default UploadFile;