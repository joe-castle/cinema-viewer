import React, { FormEvent } from 'react'
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap'

import { formatTime, zeroPad } from '../common/utils'
import { useFormInput } from '../common/hooks';
import { useDispatch } from 'react-redux';
import { filmActions } from '../store/actions/films';

export interface IWatchedFormProps {
  submitForm: (ev: FormEvent<HTMLFormElement>, state: IWatchedFormState) => void
}

export interface IWatchedFormState {
  rating: number,
  date: string,
  time: string,
  notes: string,
  format: string
}

export default function WatchedForm () {
  const currentDate = new Date()
  const rating = useFormInput(0)
  const format = useFormInput('2D')
  const date = useFormInput(`${currentDate.getFullYear()}-${zeroPad(currentDate.getMonth() + 1)}-${zeroPad(currentDate.getDate())}`)
  const time = useFormInput(formatTime(currentDate))
  const notes = useFormInput('')
  const dispatch = useDispatch()

  return <Form onSubmit={(ev) => dispatch(filmActions.postUpdateFilm(ev, { 
    rating: rating.value, 
    format: format.value, 
    date: date.value, 
    time: time.value, 
    notes: notes.value }))}>
    <FormGroup>
      <Label for='rating'>Rating:</Label>
      <Input type='number' min='0' max='100' name='rating' {...rating} />
    </FormGroup>
    <FormGroup>
      <Label for='format'>format:</Label>
      <Input type='select' name='format' {...format} >
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
          <Input type='date' name='date' {...date} />
        </Col>
        <Col md={6}>
          <Label for='time'>Date:</Label>
          <Input type='time' name='time' {...time} />
        </Col>
      </Row>
    </FormGroup>
    <FormGroup>
      <Label for='notes'>Notes:</Label>
      <Input type='textarea' name='notes' {...notes} />
    </FormGroup>
    <Button type='submit' color='success'>Submit</Button>
  </Form>
}
