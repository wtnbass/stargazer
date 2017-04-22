// @flow
import React from 'react';
import { connect } from 'react-redux';
import Katsu from './katsu';
import { load, latest, older } from '../actions/timeline';

type Fn = () => any;

type Props = {
  katsus: Array<any>,
  load: Fn,
  latest: Fn,
  older: Fn,
};

class LocalTimeLine extends React.Component {
  constructor(props: Props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.props.load();
    this.clearInterval = setInterval(() => this.poll(), 5000);
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    this.clearInterval();
    window.removeEventListener('scroll', this.handleScroll)
  }

  handleScroll() {
    const bottom = getScrollBottom();
    const {katsus} = this.props;
    if (bottom === 0 && katsus.length > 0) {
      this.props.older(katsus[katsus.length-1].id);
    }
    this.poll();
  }

  poll() {
    const {katsus} = this.props;
    if (document.body.scrollTop === 0 && katsus.length > 0) {
      this.props.latest(katsus[0].id);
    }
  }

  render() {
    return (
      <div className="column">
        {this.props.katsus.map(k => <Katsu key={k.id} katsu={k}/>)}
      </div>
    )
  }
}

function getScrollBottom() {
  var body = window.document.body;
  var html = window.document.documentElement;
  var scrollTop = body.scrollTop || html.scrollTop;
  return html.scrollHeight - html.clientHeight - scrollTop;
}

const mapStateToProps = (state) => {
  return ({
    katsus: state.timeline.local
  });
};

const mapDispatchRoProps = (dispatch) => ({
  load: () => dispatch(load()),
  latest: (since_id) => dispatch(latest(since_id)),
  older: (max_id) => dispatch(older(max_id)),
});

export default connect(mapStateToProps, mapDispatchRoProps)(LocalTimeLine);
