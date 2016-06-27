// /* @flow */
'use strict'

import { describe, it } from 'mocha'
import expect from 'expect'

import { Map, List, fromJS } from 'immutable'

import { initialState } from '../../../../app/js/reducers/filters-helpers'

import {
  SET_FILTER,
  RESET_FILTERS,
  NAME_TYPE,
  EMAIL_TYPE,
  OPENING_TIMESTAMP_TYPE,
  CLOSING_TIMESTAMP_TYPE,
  EMPLOYEE_TYPE,
  OPEN_STATUS_TYPE,
  LOCATION_TYPE,
  setFilter,
  clearTimestamp,
} from '../../../../app/js/actions'

import reducer from '../../../../app/js/reducers/filters'

describe('Filter Reducer', () => {
  it('should return a Map', () => {
    let state
    const action = {
      type: 'NONE',
    }
    const newState = reducer(state, action)
    expect(Map.isMap(newState)).toBe(true)
  })

  it('should containt all types in map', () => {
    let state
    const action = {
      type: 'NONE',
    }
    const newState = reducer(state, action)
    expect(newState.has(NAME_TYPE)).toBe(true)
    expect(newState.has(EMAIL_TYPE)).toBe(true)
    expect(newState.has(OPENING_TIMESTAMP_TYPE)).toBe(true)
    expect(newState.has(CLOSING_TIMESTAMP_TYPE)).toBe(true)
    expect(newState.has(EMPLOYEE_TYPE)).toBe(true)
    expect(newState.has(OPEN_STATUS_TYPE)).toBe(true)
    expect(newState.has(LOCATION_TYPE)).toBe(true)
  })

  // it('should Set new filter value correctly', () => {
  //   const state = Map({
  //     [OPENING_TIMESTAMP_TYPE]: Map({
  //       active: true,
  //     }),
  //   })
  //   let action = {
  //     type: SET_FILTER,
  //     payload: {
  //       type: OPENING_TIMESTAMP_TYPE,
  //       data: {
  //         active: false,
  //       },
  //     },
  //   }
  //   let newState = reducer(state, action)
  //
  //   expect(newState).toEqual(Map({
  //     [OPENING_TIMESTAMP_TYPE]: Map({
  //       active: false,
  //     }),
  //   }))
  //
  //   action = {
  //     type: 'SET_FILTER',
  //     payload: {
  //       type: 'opening_timestamp',
  //       data: {
  //         active: true,
  //       },
  //     },
  //   }
  //
  //   newState = reducer(state, action)
  //
  //   expect(newState).toEqual(Map({
  //     [OPENING_TIMESTAMP_TYPE]: Map({
  //       active: true,
  //     }),
  //   }))
  //
  // })

  it('should rest the filter to initial state', () => {
    const state = Map({
      [OPENING_TIMESTAMP_TYPE]: Map({
        active: true,
      }),
    })
    let action = {
      type: SET_FILTER,
      payload: {
        type: OPENING_TIMESTAMP_TYPE,
        data: {
          active: false,
        },
      },
    }
    reducer(state, action)

    action = {
      type: RESET_FILTERS,
      payload: {
        type: OPENING_TIMESTAMP_TYPE,
      },
    }

    const newState = reducer(state, action)

    expect(newState).toEqual(initialState)
  })

  describe('#SET_FILTER', () => {

    describe('NAME_TYPE', () => {

      // should set the state active if setting filter with new name
      it('should set the state active if setting filter with new name and empty list', () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        const action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))
      })

      it(`should set the state active to false
        if setting filter with name already in the list and no other name is present`, () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        })

        const action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      it(`should be active
        if setting same value when different value is also in the list`, () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        const action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))
      })

      // sould reset the individual filter if setting with name already in it
      it('should reset individual filter if setting value already present in list', () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        let action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      // should add a name to list of filters if the name is new
      it('should add a name to list of filters if the name is new', () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        let action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))

        action = setFilter('name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        }))
      })

      // should remove a name from list of filters if name is not new
      it('should remove a name from list of filters if name is not new', () => {
        const state = Map({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        })

        let action = setFilter('name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [NAME_TYPE]: Map({
            type: NAME_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

    })





    describe('EMAIL_TYPE', () => {

      // should set the state active if setting filter with new name
      it('should set the state active if setting filter with new email and empty list', () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        const action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))
      })

      it(`should set the state active to false
        if setting filter with email already in the list and no other email is present`, () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        })

        const action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      it(`should be active
        if setting same value when different value is also in the list`, () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        const action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))
      })

      // sould reset the individual filter if setting with name already in it
      it('should reset individual filter if setting value already present in list', () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        let action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('email_address', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      // should add a name to list of filters if the name is new
      it('should add a email to list of filters if the email is new', () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        let action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))

        action = setFilter('email_address', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        }))
      })

      // should remove a name from list of filters if name is not new
      it('should remove a email from list of filters if email is not new', () => {
        const state = Map({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        })

        let action = setFilter('email_address', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('email_address', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMAIL_TYPE]: Map({
            type: EMAIL_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

    })






    describe('OPENING_TIMESTAMP_TYPE', () => {
      // should set new timestamp
      it('should set new tiemstamp', () => {
        const state = Map({
          [OPENING_TIMESTAMP_TYPE]: Map({
            type: OPENING_TIMESTAMP_TYPE,
            active: false,
            timestamp: 0,
          })
        })

        const newState = reducer(state, setFilter('opening_timestamp', 123))

        expect(newState).toEqual(Map({
          [OPENING_TIMESTAMP_TYPE]: Map({
            type: OPENING_TIMESTAMP_TYPE,
            active: true,
            timestamp: 123,
          }),
        }))
      })

      // should clear timestamp
      it('should clear timestamp', () => {
        const state = Map({
          [OPENING_TIMESTAMP_TYPE]: Map({
            type: OPENING_TIMESTAMP_TYPE,
            active: true,
            timestamp: 123,
          })
        })

        const newState = reducer(state, clearTimestamp('opening_timestamp'))

        expect(newState).toEqual(Map({
          [OPENING_TIMESTAMP_TYPE]: Map({
            type: OPENING_TIMESTAMP_TYPE,
            active: false,
            timestamp: 0,
          }),
        }))
      })
    })

    describe('CLOSING_TIMESTAMP_TYPE', () => {

      // should set new timestamp
      it('should set new tiemstamp', () => {
        const state = Map({
          [CLOSING_TIMESTAMP_TYPE]: Map({
            type: CLOSING_TIMESTAMP_TYPE,
            active: false,
            timestamp: 0,
          })
        })

        const newState = reducer(state, setFilter('closing_timestamp', 123))

        expect(newState).toEqual(Map({
          [CLOSING_TIMESTAMP_TYPE]: Map({
            type: CLOSING_TIMESTAMP_TYPE,
            active: true,
            timestamp: 123,
          }),
        }))
      })

      // should clear timestamp
      it('should clear timestamp', () => {
        const state = Map({
          [CLOSING_TIMESTAMP_TYPE]: Map({
            type: CLOSING_TIMESTAMP_TYPE,
            active: true,
            timestamp: 123,
          })
        })

        const newState = reducer(state, clearTimestamp('closing_timestamp'))

        expect(newState).toEqual(Map({
          [CLOSING_TIMESTAMP_TYPE]: Map({
            type: CLOSING_TIMESTAMP_TYPE,
            active: false,
            timestamp: 0,
          }),
        }))
      })

    })








    describe('EMPLOYEE_TYPE', () => {

      it('should set the state active if setting filter with new employee and empty list', () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        const action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))
      })

      it(`should set the state active to false
        if setting filter with employee already in the list and no other employee is present`, () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        })

        const action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      it(`should be active
        if setting same value when different value is also in the list`, () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        const action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))
      })

      // sould reset the individual filter if setting with name already in it
      it('should reset individual filter if setting value already present in list', () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        let action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('employee_name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      // should add a name to list of filters if the name is new
      it('should add a employee to list of filters if the employee is new', () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        let action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))

        action = setFilter('employee_name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        }))
      })

      // should remove a name from list of filters if name is not new
      it('should remove a employee from list of filters if employee is not new', () => {
        const state = Map({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        })

        let action = setFilter('employee_name', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('employee_name', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [EMPLOYEE_TYPE]: Map({
            type: EMPLOYEE_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

    })







    describe('OPEN_STATUS_TYPE', () => {

    })








    describe('LOCATION_TYPE', () => {

      // should set the state active if setting filter with new name
      it('should set the state active if setting filter with new email and empty list', () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        const action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))
      })

      it(`should set the state active to false
        if setting filter with email already in the list and no other email is present`, () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        })

        const action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      it(`should be active
        if setting same value when different value is also in the list`, () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        const action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))
      })

      // sould reset the individual filter if setting with name already in it
      it('should reset individual filter if setting value already present in list', () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Yo', 'Bro'),
          }),
        })

        let action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('location', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })

      // should add a name to list of filters if the name is new
      it('should add a email to list of filters if the email is new', () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: false,
            by: List.of(),
          }),
        })

        let action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Bro'),
          }),
        }))

        action = setFilter('location', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        }))
      })

      // should remove a name from list of filters if name is not new
      it('should remove a email from list of filters if email is not new', () => {
        const state = Map({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Bro', 'Yo'),
          }),
        })

        let action = setFilter('location', 'Bro')

        const newState = reducer(state, action)

        expect(newState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: true,
            by: List.of('Yo'),
          }),
        }))

        action = setFilter('location', 'Yo')
        const secondState = reducer(newState, action)

        expect(secondState).toEqual(fromJS({
          [LOCATION_TYPE]: Map({
            type: LOCATION_TYPE,
            active: false,
            by: List.of(),
          }),
        }))
      })
    })
  })

  describe('#FILTER_SEARCH_RESULT', () => {
    describe('NAME_TYPE', () => {

    })
  })
})
