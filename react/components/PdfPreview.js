import React from 'react';

import Constants from '../constants';

export default class PdfPreview extends React.Component {
  render () {
    return (
      <iframe className="pdf-preview" src={Constants.BASE_URL + `/file/raw/${this.props.content.name}?path=` + this.props.content.path} />
    )
  }
};
