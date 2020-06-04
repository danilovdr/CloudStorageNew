import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    InputGroup,
    Input,
    InputGroupAddon,
    Button
} from 'reactstrap'

const Search = () => {
    const [searchText, setSearchText] = useState("");

    const search = () => {

    };

    return (
        <InputGroup>
            <Input onChange={e => setSearchText(e.target.value)} />
            <InputGroupAddon addonType="prepend">
                <Button color="info" onClick={search}>Найти</Button>
            </InputGroupAddon>
        </InputGroup>
    )
}

export default Search;