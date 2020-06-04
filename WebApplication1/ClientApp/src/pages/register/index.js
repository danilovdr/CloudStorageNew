import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { account } from '../../api';
import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Input,
    CardFooter,
    Button
} from 'reactstrap';
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
    const cardStyle = {
        marginTop: "150px",
        marginLeft: "auto",
        marginRight: "auto",
        width: "300px"
    };

    const history = useHistory();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = () => {
        account.register(name, password, confirmPassword)
            .then(() => history.push("/folder/my"));
    }

    return (
        <Card style={cardStyle}>
            <CardHeader><h4>Регистрация</h4></CardHeader>
            <CardBody>
                <FormGroup>
                    <Input placeholder="Name" onChange={e => setName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Input placeholder="Confirm password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
            </CardBody>
            <CardFooter>
                <FormGroup>
                    <Button className="w-100" onClick={register}>Регистрация</Button>
                </FormGroup>
                <FormGroup>
                    <NavLink to="/authorize">
                        <Button className="w-100">Войти</Button>
                    </NavLink>
                </FormGroup>
            </CardFooter>
        </Card >
    )
}

export default Register;