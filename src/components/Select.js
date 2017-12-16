import React from 'react'

function Select({ selectEnabled, changeFunction, selectOptions }) {
  const optionsLabel = <option>{ selectOptions[0] }</option>
  const optionsList = selectOptions.slice(1).map(el => <option value={ el.toLowerCase().replace(' ', '-') }>{ el }</option>)
  return (
    <select className="form-control label-select" disabled={ selectEnabled ? "" : "disabled" } onChange={ changeFunction }>
      { optionsLabel }
      { optionsList }
    </select>
  )
}

export default Select