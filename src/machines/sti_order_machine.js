import { Machine } from 'xstate'
import { mergeDeepRight } from 'ramda'

const metaData = {
  states: {
    postcode: {
      meta: {
        questions: [{
          id: 'postcode',
          type: 'postcode',
          label: 'postcode',
          text: 'What is your postcode?'
        }]
      }
    },
    age: {
      meta: {
        questions: [{
          id: 'age',
          type: 'number',
          label: 'age',
          text: 'What is your age?'
        }]
      }
    },
    symptoms: {
      meta: {
        questions: [{
          id: 'symptoms',
          type: 'text',
          label: 'showing signs',
          text: 'Are you showing symptoms?',
          extra: 'Here is some extra information, which we can easily change!'
        }]
      }
    },
    terms: {
      meta: {
        questions: [{
          id: 'consent',
          type: 'text',
          label: 'Agree to terms?',
          text: 'Do you agree to the term and conditions'
        }, {
          id: 'consent_again',
          type: 'text',
          label: 'What about these?',
          text: 'These ones?'
        }]
      }
    },
    type_of_kit: {
      meta: {
        questions: [{
          id: 'type_of_kit',
          type: 'text',
          label: 'Type of kit',
          text: 'What type of kit do you want?',
          extra: 'This has no bolt ons'
        }]
      }
    },
    type_of_kit_bolt_on: {
      meta: {
        questions: [{
          id: 'type_of_kit_bolt_on',
          type: 'text',
          label: 'Bolt on enabled type of kit',
          text: 'What type of kit do you want?',
          extra: 'This has lots of bolt ons'
        }]
      }
    }
  }
}

const stiMachine = {
  id: 'StiOrder',
  initial: 'idle',
  context: {
    bolt_on: true,
    postcode: '',
    age: 0,
    symptoms: 'no'
  },
  states: {
    idle: {
      on: {
        NEXT: 'postcode'
      }
    },
    postcode: {
      on: {
        NEXT: {
          target: 'age',
          actions: 'assignValue'
        },
        OUTSIDE: '#kickout.outside',
        OVER_QUOTA: '#kickout.over'
      }
    },
    age: {
      id: 'age',
      on: {
        BACK: 'postcode',
        NEXT: {
          target: 'symptoms',
          actions: 'assignValue'
        },
        under_age: 'kickout.underage',
        over_age: 'kickout.overage'
      }
    },
    symptoms: {
      on: {
        YES: 'symptoms_info',
        NEXT: {
          target: 'terms',
          actions: 'assignValue'
        },
        BACK: 'age'
      }
    },
    symptoms_info: {
      on: {
        always: 'terms'
      }
    },
    terms: {
      on: {
        NEXT: [{
          target: 'type_of_kit_bolt_on',
          actions: 'assignValue',
          cond: 'boltOnEnabled'
        },{
          target: 'type_of_kit',
          actions: 'assignValue'
        }],
        BACK: 'symptoms',
        decline: 'kickout.error'
      }
    },
    type_of_kit: {
      on: {
        NEXT: 'postcode'
      }
    },
    type_of_kit_bolt_on: {
      on: {
        NEXT: 'postcode'
      }
    },
    kickout: {
      id: 'kickout',
      initial: 'error',
      meta: {
        type: 'kickout',
        label: 'nope',
        text: 'because'
      },
      states: {
        error: {},
        outside: {},
        over: {},
        overage: {},
        underage: {}
      }
    }
  }
}

export const orderMachine = new Machine(mergeDeepRight(stiMachine, metaData))
