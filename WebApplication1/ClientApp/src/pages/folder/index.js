import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap'
import { Route } from 'react-router-dom';
import Header from './header';
import MyFolder from './my';
import SharedFolder from './shared';

const Folder = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Route exact path="/folder/my/" component={MyFolder} />
                <Route exact path="/folder/my/:id" component={MyFolder} />
                <Route exact path="/folder/shared/" component={SharedFolder} />
                <Route exact path="/folder/shared/:id" component={SharedFolder} />
            </Container>
        </>
    )
}

export default Folder;