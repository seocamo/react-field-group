import * as React from 'react'

interface IProps {
  type?: string
  value?: string | number | boolean
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  convert?: string
  [s: string]: any
}
interface IState {
  value?: string | number | boolean
}
export default class Inputer extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      value: props.value
    }
  }

  componentDidUpdate(prevProps: IProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ value: this.props.value })
    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    this.setState({
      value: e.target.type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : e.target.value
    })
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const { value, onChange, required, convert, ...rest } = this.props
    const converted = !convert
      ? this.props.type === 'number'
        ? 'number'
        : this.props.type === 'checkbox'
        ? 'boolean'
        : convert || 'string'
      : 'string'
    if (this.props.type === 'textarea') {
      return (
        <textarea
          {...rest}
          onChange={this.onChange}
          data-required={required || undefined}
          data-convert={converted}
          value={typeof this.state.value === 'string' ? this.state.value || '' : ''}
        />
      )
    }
    return (
      <input
        value={
          this.props.type === 'checkbox' ? '' : typeof this.state.value === 'boolean' ? '' : this.state.value || ''
        }
        checked={this.props.type === 'checkbox' ? Boolean(this.state.value) : undefined}
        {...rest}
        onChange={this.onChange}
        data-required={required || undefined}
        data-convert={converted}
      />
    )
  }
}
