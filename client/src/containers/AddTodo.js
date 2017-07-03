import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'
import { Field, reduxForm } from 'redux-form'
import FieldInput from '../components/FieldInput'

let getAddress = (dispatch, input) => {
  if (!input.value.trim()) {
    return false
  }

  let url = 'http://api.zipaddress.net/?zipcode=' + input.value;
  asyncAddressApi(url).then(function onFulfilled(value){
    let { code, data } = JSON.parse(value)
    if (code === '200') {
      dispatch(addTodo(data.fullAddress))
      input.value = ''
    }
  });
}

let asyncAddressApi = (url) => {
  return new Promise(function (resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url, true);
    req.onload = function () {
      if (req.status === 200) {
        resolve(req.responseText);
      }
    };
    req.send();
  });
}

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        getAddress(dispatch, input)
      }}>
        <label>郵便番号入力</label>
        <div>
          <input ref={node => {
            input = node
          }} />
          <Field
            name="zipCode"
            component="input"
            type="text"
            placeholder="ZipCode"
            value = "any"
          />
          <Field name="email" type="email" component={FieldInput} label="email"/>
          <button type="submit">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

// export default AddTodo
export default reduxForm({
  form: 'addToDo' // a unique identifier for this form
})(AddTodo)
