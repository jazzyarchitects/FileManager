import React from 'react';
import Constants from '../constants';

export default class HiddenToggle extends React.Component {
  toggleState () {
    this.hiddenVisible = !this.hiddenVisible;
    let event = new CustomEvent(Constants.Events.hiddenVisibilityToggle, {detail: {visibility: this.hiddenVisible}});
    document.dispatchEvent(event);
    this.forceUpdate();
  }

  render () {
    this.hiddenVisible = this.props.visibility;
    if (this.hiddenVisible) {
      return (
        <div onClick={this.toggleState.bind(this)} className="toggle-icon"><i className="material-icons">visibility</i> Visible Hidden Files</div>
      )
    } else {
      return (
        <div onClick={this.toggleState.bind(this)} className="toggle-icon"><i className="material-icons toggle-icon">visibility_off</i> Hide Hidden Files </div>
      )
    }
  }
}
