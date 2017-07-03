import React from'react'

export default class FieldInput extends React.Component {
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  render() {
    // eslint-disable-next-line
    const {input, label, type, meta, meta: { touched, error }} = this.props
    return (
      <div className="c-container--full">
        <label>{label}</label>
        <div>
          <input {...input} placeholder={label} type={type}/>
          {touched && error && <span className="c-text--highlight">{error}</span>}
        </div>
      </div>
    )
  }
}
