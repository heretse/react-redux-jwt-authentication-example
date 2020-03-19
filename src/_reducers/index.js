import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { devices } from './devices.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  devices,
  alert
});

export default rootReducer;