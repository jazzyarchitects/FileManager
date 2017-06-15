import React from 'react';

import Encrypter from '../../compiled/modules/utils/crypto';

import Constants from '../constants';

export default class PdfPreview extends React.Component {
  render () {
    return (
      <iframe className="pdf-preview" src={Constants.BASE_URL + `/file/raw/${this.props.content.name}?path=` + Encrypter.encryptString(this.props.content.path)} />
    )
  }
};
