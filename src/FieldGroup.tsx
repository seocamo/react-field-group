import * as React from 'react'

function notEmptyFilter<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}
interface IInputSet {
  path: string[]
  required: boolean
  value: string | number | boolean
  convert: string
}
// data-id - string
// data-type - string or a function
const isNumber = (x: string | Number) => !Number.isNaN(Number(x))
const inputer = (input: HTMLInputElement): IInputSet => ({
  path: input.id.split('.'),
  required: Boolean(input.dataset.required),
  value: input.type === 'checkbox' ? input.checked : input.value,
  convert: input.dataset.convert || 'string'
})
const getConvert: Function = (convert: string) => {
  switch (convert) {
    case 'number':
      return Number
    case 'boolean':
      return Boolean
    case 'date':
      return (str: string) => new Date(str)
    default:
      return String
  }
}
const former = (elements: HTMLFormControlsCollection): IInputSet[] =>
  Array.from(elements, el => (el.id ? inputer(el as HTMLInputElement) : null)).filter(notEmptyFilter)
const objecter = (array: IInputSet[]) =>
  array.reduce(
    (r: any, x) => {
      const convert = getConvert(x.convert)
      if (x.required) {
        r.required.push({
          id: x.path.join('.'),
          value: x.value
        })
      }
      let cur: any = r.state
      for (let i = 0; i < x.path.length; i += 1) {
        const item = x.path[i]
        if (i === x.path.length - 1) {
          if (Array.isArray(cur)) {
            cur.push(convert(x.value))
          } else {
            cur[item] = convert(x.value)
          }
          break
        }
        if (isNumber(item)) {
          if (!cur[item]) {
            cur[item] = []
          }
          cur = cur[item]
        } else {
          if (!cur[item]) {
            cur[item] = {}
          }
          cur = cur[item]
        }
      }

      return r
    },
    {
      state: {},
      required: []
    }
  )
export interface IFieldGroupState {
  [s: string]: any
}
export interface IFieldGroupRequired {
  id: string
  value: string
}
export type onFieldGroupSubmit = (
  state: IFieldGroupState,
  required: IFieldGroupRequired[],
  e: React.FormEvent<HTMLFormElement>
) => void

interface IProps {
  onSubmit: onFieldGroupSubmit
}

export default class FieldGroup extends React.Component<IProps> {
  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const val = objecter(former((e.target as HTMLFormElement).elements))
    this.props.onSubmit(val.state, val.required, e)
  }
  render() {
    return <form onSubmit={this.onSubmit}>{this.props.children}</form>
  }
}
