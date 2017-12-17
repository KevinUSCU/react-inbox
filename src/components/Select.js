import React from 'react'

function Select({ selectEnabled, selectLabel, selectOptions, changeFunction }) {
  const optionsList = selectOptions.map((el, i) => {
    return <option key={ i } value={ el.toLowerCase().replace(' ', '-') }>{ el }</option>
  })
  return (
    <select className="form-control label-select" disabled={ selectEnabled ? "" : "disabled" } onChange={ changeFunction }>
      <option value=''>{ selectLabel }</option>
      { optionsList }
    </select>
  )
}

export default Select