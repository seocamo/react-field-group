import * as React from 'react'

import FieldGroup from './FieldGroup'
import InputField from './InputField'
import SelectField from './SelectField'

export class Example extends React.Component<{}> {
  render() {
    return (
      <FieldGroup
        onSubmit={(state, required, e) => {
          /*tslint:disable*/
          console.log(state, required, e)
          /*tslint:enable*/
        }}
      >
        <InputField id='id0.p1' name='name1' value={true} type='checkbox' />
        <InputField id='id1.p2' name='name2' value={4} type='number' />
        <InputField id='id2.p3' name='name3' value='' required={true} />
        <InputField id='id2.p4' name='name4' value='2018-12-12' type='date' />
        <InputField id='id3.0.p3' name='name4' value='v5' />
        <InputField id='id3.1.p3' name='name4' value='v6' type='textarea' />
        <SelectField id='s1' value='b'>
          <option value='a'>1</option>
          <option value='b'>2</option>
          <option value='c'>3</option>
        </SelectField>
        <InputField type='submit' value='done' />
      </FieldGroup>
    )
  }
}
