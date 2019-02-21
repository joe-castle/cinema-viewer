import React, { Component, ChangeEvent } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { formatTime, zeroPad } from '../common/utils'
import { IWatchedFormProps, IWatchedFormState } from '../types/react'

class WatchedForm extends Component<IWatchedFormProps, IWatchedFormState> {
  constructor (props: IWatchedFormProps) {
    super(props)

    const date: Date = new Date()

    this.state = {
      rating: 0,
      format: '2D',
      date: `${date.getFullYear()}-${zeroPad(date.getMonth() + 1)}-${zeroPad(date.getDate())}`,
      time: formatTime(date),
      notes: ''
    }
  }

  handleChange = (value: string): (ev: ChangeEvent<HTMLInputElement>) => void => {
    return (ev) => {
      this.setState({ [value]: ev.target.value })
    }
  }

  render () {
    const { rating, date, time, notes, format }: IWatchedFormState = this.state

    return <Form onSubmit={(ev) => this.props.submitForm(ev, this.state)}>
      <FormGroup>
        <Label for='rating'>Rating:</Label>
        <Input type='number' min='0' max='100' name='rating' value={rating} onChange={this.handleChange('rating')} />
      </FormGroup>
      <FormGroup>
        <Label for='format'>format:</Label>
        <Input type='select' name='format' value={format} onChange={(this.handleChange('format'))} >
          <option>2D</option>
          <option>3D</option>
          <option>IMAX</option>
          <option>IMAX 3D</option>
          <option>4DX</option>
          <option>4DX 3D</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label for='date'>Date:</Label>
            <Input type='date' name='date' value={date} onChange={this.handleChange('date')} />
          </Col>
          <Col md={6}>
            <Label for='time'>Date:</Label>
            <Input type='time' name='time' value={time} onChange={this.handleChange('time')} />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for='notes'>Notes:</Label>
        <Input type='textarea' name='notes' value={notes} onChange={this.handleChange('notes')} />
      </FormGroup>
      <Button type='submit' color='success'>Submit</Button>
    </Form>
  }
}

export default WatchedForm
