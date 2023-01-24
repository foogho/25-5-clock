import React, { createRef } from 'react';
import Session from './session';
import Timer from './timer';

const sessions = [
  {
    name: 'break',
    defaultLength: 5,
    length: 5,
  },
  {
    name: 'session',
    defaultLength: 25,
    length: 25,
  },
];
export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
    this.timerRef = createRef();
    this.modSessionLength = this.modSessionLength.bind(this);
    this.initializeSessionsLength = this.initializeSessionsLength.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  initializeState() {
    return {
      sessions: sessions,
      activeSessionIdx: 1,
    };
  }
  initializeSessionsLength() {
    this.setState({
      sessions: this.state.sessions.map((session) => ({
        ...session,
        length: session.defaultLength,
      })),
    });
  }
  modSessionLength(session, type) {
    if (type !== 'increment' && type !== 'decrement') {
      throw new Error('provided type is not a valid type');
    }
    const sessions = this.state.sessions;
    const sessionIdx = sessions.findIndex(
      (value) => value.name === session.name
    );
    if (type === 'decrement' && session.length - 1 === 0) {
      return;
    }
    if (type === 'increment' && session.length + 1 > 60) {
      return;
    }
    return this.setState({
      sessions: [
        ...sessions.slice(0, sessionIdx),
        {
          ...session,
          length:
            type === 'increment' ? session.length + 1 : session.length - 1,
        },
        ...sessions.slice(sessionIdx + 1),
      ],
    });
  }

  onReset() {
    this.setState(this.initializeState());
    this.timerRef.current.reset();
  }

  render() {
    const sessions = this.state.sessions;
    const activeSessionIdx = this.state.activeSessionIdx;
    const activeSession = sessions[activeSessionIdx];
    return (
      <div className="card mx-auto text-center shadow">
        <div className="card-header">
          <div className="row">
            {sessions.map(({ name, length }, i) => (
              <div className="col p-3" key={i}>
                <Session
                  name={name}
                  length={length}
                  onEdit={(sessionName, type) => {
                    this.modSessionLength(
                      this.state.sessions.find(
                        (session) => session.name === sessionName
                      ),
                      type
                    );
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <Timer
            label={activeSession.name}
            time={activeSession.length}
            onFinish={() => {
              this.setState({
                activeSessionIdx: activeSessionIdx === 1 ? 0 : 1,
              });
              this.timerRef.current.start();
            }}
            ref={this.timerRef}
          />
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={this.onReset} id="reset">
            reset
          </button>
        </div>
      </div>
    );
  }
}
