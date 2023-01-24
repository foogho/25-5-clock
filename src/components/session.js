import React from 'react';

export default class Session extends React.Component {
  render() {
    const name = this.props.name;
    const length = this.props.length;
    return (
      <div className="row row-cols-1">
        <h4 id={`${name}-label`}>{name} length</h4>
        <h5 id={`${name}-length`}>{length}</h5>
        <div>
          <div className="btn-group btn-group-sm">
            <div
              id={`${name}-increment`}
              className="btn btn-secondary"
              onClick={() => {
                this.props.onEdit(name, 'increment');
              }}
            >
              increment
            </div>
            <div
              id={`${name}-decrement`}
              className="btn btn-secondary"
              onClick={() => {
                this.props.onEdit(name, 'decrement');
              }}
            >
              decrement
            </div>
          </div>
        </div>
      </div>
    );
  }
}
