import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class Footer extends Component {
    static propTypes = {};

    render() {
        return (<div></div>);
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Footer);
