import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { account } from '../../api';
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    CardFooter,
    Button,
    Input,
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';

const Authorization = () => {
    const cardStyle = {
        marginTop: "150px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "300px"
    };

    const history = useHistory();
    
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {
        account.login(name, password)
            .then(resp => resp.ok ? history.push("/folder/my") : null)
    }

    return (
        <Card style={cardStyle}>
            <CardHeader><h4>Войти</h4></CardHeader>
            <CardBody>
                <FormGroup>
                    <Input placeholder="Name" onChange={e => setName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
            </CardBody>
            <CardFooter>
                <FormGroup>
                    <Button className="w-100" onClick={login}>Войти</Button>
                </FormGroup>
                <FormGroup>
                    <NavLink to="/register">
                        <Button className="w-100">Зарегестрироваться</Button>
                    </NavLink>
                </FormGroup>
            </CardFooter>
        </Card >
    )
}

export default Authorization;