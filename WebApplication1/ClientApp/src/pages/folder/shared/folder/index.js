import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from 'react-router-dom';
import img from '../../../../img/folder.png';
import { Button } from 'reactstrap';

const Folder = (props) => {
    const iconStyle = {
        width: "100px"
    };

    const history = useHistory();

    const onClick = () => {
        history.push("/folder/shared/" + props.id);
    };

    return (

        <Button
            style={iconStyle}
            color="link"
            onClick={onClick}
        >
            <img className="w-100" src={img} alt="folder" />
            {props.name}
        </Button>
    )
}

export default Folder;