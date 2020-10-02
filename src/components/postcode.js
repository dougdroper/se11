import { createRef, useEffect } from 'react'
import { useMachine } from '@xstate/react'
import { stepMachine } from '../machines/step_machine'
import { validate } from '../utils'

import {
  Box,
  Input,
  Icon,
  Grid,
  Heading,
  Button
} from '@chakra-ui/core'

const Question = ({ extra, refs, field, label, type, text, id }) => {
  useEffect(() => {
    refs[0].current.focus()
  }, [])

  const [current, send] = useMachine(stepMachine(validate))
  const { value } = current.context
  const validated = current.matches('validated')
  const invalid = current.matches({ editing: 'invalid' })

  return (
    <>
      <Heading as='h3' size='lg'>{label}</Heading>
      <p>{text}</p>
      {extra && <p>{extra}</p>}
      <Box
        display='flex'
        flexDirection='row'
      >
        <Input
          type={type}
          value={value}
          style={{
            borderColor: invalid ? 'red' : undefined,
            marginBottom: '20px'
          }}
          onChange={e => send('CHANGE', { value: e.target.value })}
          onBlur={e => send('SUBMIT')}
          ref={field}
          data-id={id}
        />
        {invalid ? <div className='error'>Sorry, that's invalid.</div> : null}
        {validated && <Icon name='check-circle' />}
      </Box>
    </>
  )
}

const Postcode = ({ current, send, questions, onSubmit }) => {
  var refs = []

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault()

        const values = refs.reduce((memo, r) => {
          memo[r.current.dataset.id] = r.current.value
          return memo
        }, {})

        onSubmit(values)
      }}
      >
        <Grid>
          {questions.map(q => {
            const fieldRef = createRef()
            refs.push(fieldRef)
            return (
              <Question refs={refs} field={fieldRef} key={q.id} extra={q.extra} text={q.text} type={q.type} label={q.label} id={q.id} />
            )
          })}
          <Box
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
          >

            {!current.matches('postcode') && <Button onClick={() => send('BACK')}>Back</Button>}
            <Button variantColor="teal" type='submit'>Next</Button>
          </Box>
        </Grid>
      </form>
    </>
  )
}

export default Postcode
