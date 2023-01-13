import React from 'react';

export default class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: [
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
      ],
    };
    this.modSessionLength = this.modSessionLength.bind(this);
    this.initilizeSessionsLength = this.initilizeSessionsLength.bind(this);
  }

  initilizeSessionsLength() {
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

  render() {
    const sessions = this.state.sessions;
    return (
      <div className="card mx-auto text-center">
        <div className="card-header">
          <div className="row">
            {sessions.map((session, i) => (
              <div className="col" key={i}>
                <div className="row row-cols-1 g-2">
                  <h3 id={`${session.name}-label`}>{session.name} Length</h3>
                  <h5 id={`${session.name}-length`}>{session.length}</h5>
                  <div>
                    <div className="btn-group btn-group-sm">
                      <div
                        id={`${session.name}-increment`}
                        className="btn btn-secondary"
                        onClick={() => {
                          this.modSessionLength(session, 'increment');
                        }}
                      >
                        increment
                      </div>
                      <div
                        id={`${session.name}-decrement`}
                        className="btn btn-secondary"
                        onClick={() => {
                          this.modSessionLength(session, 'decrement');
                        }}
                      >
                        decrement
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card-body">
          <h3 id="timer-label" className="mb-4">
            timer label
          </h3>
          <h1 className="display-1" id="time-left">
            25:00
          </h1>
        </div>
        <div className="card-footer">
          <div className="row">
            <div className="col">
              <button className="btn btn-primary" id="start_stop">
                start/stop
              </button>
            </div>
            <div className="col">
              <button
                className="btn btn-primary"
                id="reset"
                onClick={this.initilizeSessionsLength}
              >
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
