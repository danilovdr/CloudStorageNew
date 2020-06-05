import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { folder } from '../../../../api';

const ConfirmRemove = (props) => {
    const remove = () => {
        folder.remove(props.id)
            .then(props.remove(props.id))
    }

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>Удаление файла</ModalHeader>
            <ModalBody>
                Вы действительно хотите удалить {props.name}?
            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={remove}>Удалить</Button>
                <Button color="info" onClick={props.toggle}>Закрыть</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ConfirmRemove;