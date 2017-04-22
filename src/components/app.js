import React from 'react';
import LocalTimeline from './local_timline';
import api from '../api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <LocalTimeline />
      </div>
    );
  }
}
