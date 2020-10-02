import {
  Box,
  Input,
  Button
} from '@chakra-ui/core'

import { Container } from '../components/Container'

import { Machine } from 'xstate';
import { useMachine, asEffect } from '@xstate/react';

import State from '../machines/age_and_postcode_state.json'

const ageAndPostcodeMachine = new Machine(State)

const AgeAndPostcodeQuestions = ({ current, send, value }) => {
  const checkComplete = (type) => () => {
    send(type)
    if (type === 'Consent') {
      send('no')
    } else {
      send('yes')
    }
  }

  return(
    <Container>
      <h1>Age and postcode</h1>
      <form>
        <label>
          age:
          <Input type='text' name='name' onBlur={checkComplete('DateOfBirth')} />
        </label>
        <label>
          postcode:
          <Input type='text' name='name' onBlur={checkComplete('Postcode')} />
        </label>
        <label>
          are you showing signs:
          <Input type='text' name='name' onBlur={checkComplete('Symptoms')} />
        </label>
        <label>
          do you consent?
          <Input type='text' name='name' onBlur={checkComplete('Consent')} />
        </label>
        <Button onClick={() => send('allValid')}>Next</Button>
      </form>
    </Container>
  )
}

const YourKit = ({ current, send }) => {
  return(
    <>
      <h1>Your kit</h1>
      <Button onClick={() => send('back')} />
    </>
  )
}

const Postcode = ({ text }) => {
  return(
    <>
      <h1>{text}</h1>
    </>
  )
}

const AgeAndPostcode = () => {
  const [current, send] = useMachine(ageAndPostcodeMachine, {
    devTools: true,
    actions: {
      log: (context, event) => {
        console.log('context here', context, event)
      }
    }
  })

  send('start')

  // console.log('toplevel', current.meta[Object.keys(current.meta)[0]].questions)
  console.log('context in this level', current)

  return(
    <Container>
      {current.matches('AgeAndPostcode') && <AgeAndPostcodeQuestions current={current} send={send} value="AgeAndPostcode" />}
      {current.matches('YourKit') && <YourKit current={current} send={send} />}
    </Container>
  )
}

export default AgeAndPostcode
