import React from 'react';

import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: this.parseTime(props.time),
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.setState({ time: this.parseTime(nextProps.time) });
      // when we call setState the update process will be executed
      // so to avoid an infinite loop we have to return false
      return false;
    }
    return true;
  }
  componentDidMount() {
    this.audioEl = document.querySelector('#beep');
  }
  parseTime(time) {
    return dayjs.duration(time, 'minute');
  }
  start() {
    this.intervalId = setInterval(() => {
      const time = this.state.time;
      if (time.asSeconds() === 0) {
        this.stop();
        this.audioEl.play();
        this.props.onFinish();
        return;
      }
      this.setState({ time: time.subtract(1, 'second') });
    }, 1000);
  }
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = '';
  }
  reset() {
    this.stop();
    this.setState({ time: this.parseTime(this.props.time) });
    this.audioEl.pause();
    this.audioEl.currentTime = 0;
  }
  render() {
    const label = this.props.label;
    let time = this.state.time;
    return (
      <div className="row row-cols-1 g-4">
        <div className="col">
          <h3 id="timer-label">{label}</h3>
        </div>
        <div className="col">
          <h1 className="display-1" id="time-left">
            {time.asMinutes() !== 60
              ? `${time.format('mm:ss')}`
              : `${time.asMinutes()}:${time.format('ss')}`}
          </h1>
        </div>
        <div className="col">
          <button
            className="btn btn-primary"
            id="start_stop"
            onClick={() => {
              this.intervalId ? this.stop() : this.start();
            }}
          >
            start/stop
          </button>
        </div>
        <audio src="/timer-beep.mp3" id="beep"></audio>
      </div>
    );
  }
}
