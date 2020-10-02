import {
  Input,
  Heading,
  Button
} from '@chakra-ui/core'

import { assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { orderMachine } from '../../machines/sti_order_machine'
import Postcode from '../../components/postcode'

const Age = ({ onSubmit, send, type, text, label }) => {
  const [age, setAge] = useState(0)

  const validate = (e) => {
    e.preventDefault()
    const options = {
      18: 'valid',
      under_age: 'under_age',
      over_age: 'over_age'
    }
    console.log('age', age, options[age])
    send(options[age], { age })
  }

  return (
    <form onSubmit={validate}>
      <label>{label}</label>
      <p>{text}</p>
      <Input autoFocus type='text' onChange={e => setAge(e.target.value)} />
      <Button type='button' onClick={_ => send('BACK')}>Back</Button>
      <Button type='submit'>Next</Button>
    </form>
  )
}

const components = {
  postcode: Postcode,
  age: Age
}

const Question = () => {
  const [current, send] = useMachine(orderMachine, {
    actions: {
      assignPostcode: assign({ postcode: (_, e) => e.value }),
      assignAge: assign({ age: (_, e) => e.age })
    },
    guards: {
      postcodeValid: (ctx, e) => {
        return true
      }
    }
  })

  const questions = Object.values(current.meta)

  return (
    <>
      <Heading>Sti order</Heading>

      {questions.map((q) => {
        const C = components[q.type] || Question
        return (
          <C onSubmit={value => send('NEXT', { value })} key={q.text} parentContext={current.context} send={send} text={q.text} type={q.type} label={q.label} extra={q.extra}  />
        )
      })}

      <pre style={{ textAlign: 'left' }}>
        {JSON.stringify(
          { value: current.value, context: current.context },
          null,
          2
        )}
      </pre>
    </>
  )
}

export default Question
