import React from 'react';
import LocalTimeline from './local_timline';
import api from '../api';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      katsus: [],
    };
    this.more = this.more.bind(this);
  }
  componentDidMount() {
    this.load();
    // scroll
    window.addEventListener('scroll', (e) => {
      const bottom = getScrollBottom();
      const {katsus} = this.state;
      if (bottom === 0) {
        this.more(katsus[katsus.length-1].id)
      }
    })
  }

  load() {
    api('timelines/public?local').then(data => this.setState({
      katsus: this.state.katsus.concat(data),
    }));
  }

  more(max_id) {
    api(`timelines/public?max_id=${max_id}&local`).then(data => this.setState({
      katsus: this.state.katsus.concat(data),
    }))
  }

  render() {
    return (
      <div>
        <LocalTimeline katsus={this.state.katsus}/>
      </div>
    );
  }
}

function getScrollBottom() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var scrollTop = body.scrollTop || html.scrollTop;
  return html.scrollHeight - html.clientHeight - scrollTop;
}
