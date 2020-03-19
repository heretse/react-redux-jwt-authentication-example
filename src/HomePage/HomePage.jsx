import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(userActions.getAllDevices());
    }

    render() {
        const { user, devices } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.name}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Devices from secure api end point:</h3>
                {devices.loading && <em>Loading devices...</em>}
                {devices.error && <span className="text-danger">ERROR: {devices.error}</span>}
                {devices.items &&
                    <ul>
                        {devices.items.map((device, index) =>
                            <li key={device.id}>
                                {device.name + ' ' + device.hostname}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { devices, authentication } = state;
    const { user } = authentication;
    return {
        user,
        devices
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };