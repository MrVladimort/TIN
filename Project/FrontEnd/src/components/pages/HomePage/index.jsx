import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Container, Header} from "semantic-ui-react";

class HomePage extends Component {

    render() {
        return (
            <Container text textAlign='center'>
                <Header as='h1' content='Vova lenivi' color='purple'/>
            </Container>
        )
    }
}


HomePage.propTypes = {};

export default HomePage;