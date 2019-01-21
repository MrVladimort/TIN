import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class ZamowieniePage extends React.Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <h1>This is Zamowienie Page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(ZamowieniePage);
