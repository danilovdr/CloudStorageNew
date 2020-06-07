import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    const styles = {
        card: {
            width: "200px",
        },
        button: {
            border: 0,
        }
    }

    return (
        <div
            className="border-right"
            style={styles.card}
        >
            <NavLink to="/folder/my">
                <Button
                    active
                    outline
                    style={styles.button}
                    className="w-100 rounded-0 border-bottom border-top"
                    color="info"
                >
                    Мои файлы
                    </Button>
            </NavLink>
            <NavLink to="/folder/shared">
                <Button
                    outline
                    style={styles.button}
                    className="w-100 rounded-0 border-bottom"
                    color="info"
                >
                    Доступные файлы
                    </Button>
            </NavLink>
        </div>
    )
}

export default Sidebar;