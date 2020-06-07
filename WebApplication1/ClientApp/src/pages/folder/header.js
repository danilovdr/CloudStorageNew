import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap'
import { useHistory } from 'react-router-dom';
import { account } from '../../api';

const Header = () => {
    const history = useHistory();
    const logout = () =>
        account.logout()
            .then(() => history.push("/authorize"));

    return (
        <div className="d-flex justify-content-end p-3 border-bottom">
            <Button
                className="rounded-0"
                color="info"
                onClick={logout}
            >
                Выйти
            </Button>
        </div>
    )
}

export default Header;