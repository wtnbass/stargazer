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
    this.clearInterval = setInterval(() => this.poll(), 5000);

    window.addEventListener('scroll', (e) => {
      const bottom = getScrollBottom();
      const {katsus} = this.state;
      if (bottom === 0) {
        this.more(katsus[katsus.length-1].id);
      }
      this.poll();
    });

  }

  componentWillUnmount() {
    this.clearInterval();
  }

  poll() {
    if (document.body.scrollTop === 0) {
      this.latest(this.state.katsus[0].id);
    }
  }

  load() {
    api('timelines/public?local').then(data => this.setState({
      katsus: this.state.katsus.concat(data),
    }));
  }

  latest(since_id) {
    api(`timelines/public?since_id=${since_id}&local`).then(data => this.setState({
      katsus: data.concat(this.state.katsus)
    }))

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
