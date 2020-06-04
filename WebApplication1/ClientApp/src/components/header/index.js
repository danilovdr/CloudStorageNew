import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router';
import { account } from '../../api';
import {
    Container,
    Button,
} from 'reactstrap';
import CreateFile from './createFile';
import UploadFile from './uploadFile';
import CreateFolder from './createFolder';
import Search from './search';

const Header = (props) => {
    const history = useHistory();
    const logout = () =>
        account.logout()
            .then(() => history.push("/authorize"));

    return (
        <Container className="border-bottom" fluid>
            <div className="d-flex justify-content-between p-3">
                <div>
                    <CreateFile
                        folder={props.folder}
                        addFile={props.addFile}
                    />
                    <UploadFile
                        folder={props.folder}
                        addFile={props.addFile}
                    />
                    <CreateFolder
                        folder={props.folder}
                        addFolder={props.addFolder}
                    />
                </div>
                <div>
                    <Search />
                </div>
                <div>
                    <Button color="info" onClick={logout}>Выйти</Button>
                </div>
            </div>
        </Container>
    );
}

export default Header;