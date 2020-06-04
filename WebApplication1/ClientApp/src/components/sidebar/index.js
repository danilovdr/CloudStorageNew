import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Card,
    CardBody,
    Button
} from 'reactstrap'

const Sidebar = () => {
    return (
        <Card className="border-0" style={{ width: "250px" }}>
            <CardBody>
                <Button
                    className="w-100"
                    color="info"
                >Мои файлы</Button>
                <Button
                    className="w-100 mt-3"
                    color="info"
                >Доступные файлы</Button>
            </CardBody>
        </Card>
    )
}

export default Sidebar;