import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Container,
    Button
} from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { account } from '../../api';

const Header = () => {
    const history = useHistory();
    const logout = () =>
        account.logout()
            .then(() => history.push("/authorize"));

    return (
        <Container className="border-bottom" fluid>
            <div className="d-flex justify-content-end p-3">
                <Button color="info" onClick={logout}>Выйти</Button>
            </div>
        </Container>
    )
}

export default Header;