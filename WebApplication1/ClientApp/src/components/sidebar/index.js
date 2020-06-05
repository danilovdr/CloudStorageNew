import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    CardBody,
    Button
} from 'reactstrap'
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <Card className="border-0" style={{ width: "250px" }}>
            <CardBody>
                <NavLink to="/folder/my">
                    <Button
                        className="w-100"
                        color="info"
                    >
                        Мои файлы
                    </Button>
                </NavLink>
                <NavLink to="/folder/shared">
                    <Button
                        className="w-100 mt-3"
                        color="info"
                    >
                        Доступные файлы
                    </Button>
                </NavLink>
            </CardBody>
        </Card>
    )
}

export default Sidebar;