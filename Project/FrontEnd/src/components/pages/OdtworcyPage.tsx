import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

class OdtworcyPage extends React.Component {
    static propTypes = {};

    render() {
        return (
            <div>
                <h1>This is Odtworcy Page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(OdtworcyPage);
