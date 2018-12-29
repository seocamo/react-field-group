import * as React from 'react'

interface IProps {
  required?: boolean
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void
  [s: string]: any
}
interface IState {
  value?: string
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
  onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ value: e.target.value })
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }
  render() {
    const { value, onChange, required, ...rest } = this.props
    return (
      <select
        {...rest}
        value={this.state.value}
        onChange={this.onChange}
        data-required={required || undefined}
        data-convert={'string'}
      >
        {this.props.children}
      </select>
    )
  }
}
