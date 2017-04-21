import React from 'react';

export default ({katsu}) => (
  <div className="status">
    <Account account={katsu.account}/>
    <Time datetime={katsu.created_at}/>
    <div dangerouslySetInnerHTML={{__html: katsu.content}}/>
  </div>
);

const Account =({account}) => {
  const {url, display_name, username, avatar, acct } = account;
  return (
    <a href={url} className="status__display-name">
      <Avatar url={avatar}/>
      <small
        className="display-name"
        style={{
          display: 'inline-block',
          maxWidth: '100%',
          paddingRight: '25px',
        }}>
        <strong>{display_name || username}</strong>
        <span>{`@${acct}`}</span>
      </small>
    </a>
  );
};

const Avatar = ({url}) => {
  const missing = 'https://kirakiratter.com/avatars/original/missing.png';
  if (url.includes('missing.png'))
    url = missing;
  return (
    <div
      style={{
        float: 'left'

      }}>

      <div
        className="status__avatar"
        style={{
          width: '48px',
          height: '48px',
          backgroundSize: '48px 48px',
          backgroundImage: `url(${url})`,
        }} />
    </div>
  );
}

class Time extends React.Component {
  editTime(time) {
    const sec = Math.floor(time /1000);
    if (sec < 60)
      return sec + '秒前'
    const min = Math.floor(sec / 60);
    return min + '分前';
  }

  render() {
    const since = new Date(this.props.datetime);
    const time =  Date.now() - since;

    return (
      <span>{this.editTime(time)}</span>
    )
  }
}
