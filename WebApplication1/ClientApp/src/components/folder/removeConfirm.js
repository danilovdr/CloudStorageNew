import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { url } from '../../configuration';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

const RemoveConfirm = (props) => {
    const deleteFolder = () => {
        fetch(url + "folder/" + props.id, {
            method: "DELETE"
        })
            .then(() => {
                props.setIsOpen(false);
                props.deleteFolder(props.id);
            })
    };

    return (
        <Modal isOpen={props.isOpen}>
            <ModalHeader>Удаление папки</ModalHeader>
            <ModalBody>Вы действительно хотите удалить эту папку?</ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={deleteFolder}>Удалить</Button>
                <Button onClick={() => props.setIsOpen(false)}>Закрыть</Button>
            </ModalFooter>
        </Modal >
    )
}

export default RemoveConfirm;