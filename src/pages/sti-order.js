import {
  ThemeProvider,
  Divider,
  ColorModeProvider,
  CSSReset,
  Box,
  Heading,
  Button
} from '@chakra-ui/core'

import { assign } from 'xstate'
import { useMachine } from '@xstate/react'
import { orderMachine } from '../machines/sti_order_machine'
import Postcode from '../components/postcode'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const StiOrder = () => {
  const [current, send] = useMachine(orderMachine, {
    actions: {
      assignValue: assign((ctx, e) => (
        { ...ctx, ...e.value }
      ))
    },
    guards: {
      postcodeValid: (ctx, e) => {
        return true
      },
      boltOnEnabled: (context) => context.bolt_on === true
    },
    context: {
      bolt_on: true
    }

  })

  const id = current.configuration[0]?.id
  const questions = current.meta[id]?.questions
  const router = useRouter()

  useEffect(() => {
    router.push(`/sti-order?${current.value}`, undefined, { shallow: true })
  }, [current.value])

  const doSubmit = (value) => {
    send('NEXT', { value })
  }

  return (
    <>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <Box
            height='100vh'
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDirection='column'
          >
            <Heading
              style={{
                marginBottom: '20px'
              }}
            >Sti order</Heading>
            {current.matches('idle') && <Button onClick={_ => send('NEXT')}>Start</Button>}

            {questions && <Postcode send={send} questions={questions} onSubmit={doSubmit} current={current} />}

            <Divider />

            <pre style={{ textAlign: 'left', paddingTop: '20px' }}>
              {JSON.stringify(
                { value: current.value, context: current.context },
                null,
                2
              )}
            </pre>

          </Box>
        </ColorModeProvider>
      </ThemeProvider>
    </>
  )
}

export default StiOrder
