/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import { Map, List } from 'immutable'

import FilterContainer from '../../../../app/js/containers/Filter'
import { getAllFilters } from '../../../../app/js/selectors'

import { initialState } from '../../../../app/js/reducers/filter-component-state'

describe('Filter Container', () => {
  let store

  beforeEach(() => {
    store = {
      getState() {
        return {
          filters: Map({
            that: Map({
              type: 'that',
              active: true,
            }),
            other: Map({
              type: 'other',
              active: false,
            }),
          }),
          filterComponentState: Map({
            open: true,
            selectedFilterMenu: 'root',
          }),
        }
      },
    }
  })

  describe('root filter menu', () => {
    describe('header constructor', () => {
      it('should display "Filter By"', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.contain('Filter by')).toBe()
      })
    })

    describe('body constructor', () => {
      it('should display list of available filters', () => {
        // const filters = getAllFilters(store.getState())

        const out = mq(FilterContainer, { store })

        expect(out.has('ul')).toBe(true)
        expect(out.should.have.at.least(2, 'li')).toBe()
      })
    })

    describe('footer constructor', () => {
      it('should display Cancel button', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'button')).toBe()
        expect(out.should.contain('Cancel')).toBe()
      })

      it('should display reset button', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'button')).toBe()
        expect(out.should.contain('Reset')).toBe()
      })
    })
  })

  describe('subsequent filter menu', () => {
    beforeEach(() => {
      store = {
        getState() {
          return {
            filters: Map({
              that: Map({
                type: 'that',
                active: true,
              }),
              other: Map({
                type: 'other',
                active: false,
              }),
              opening_timestamp: Map({
                timestamp: 10,
              })
            }),
            filterComponentState: initialState.set('selectedFilterMenu', 'opening_timestamp'),
            partials: {
              name: List.of(),
            },
          }
        },
      }
    })

    describe('header constructor', () => {
      it('should display "Type" + "Filter"', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.contain('Opening time Filter'))
      })
    })

    describe('body constructor', () => {
      describe('name filter', () => {
        it('name filter should contain one input', () => {
          store = {
            getState() {
              return {
                filters: Map({
                  name: Map({
                    type: 'name',
                    active: true,
                    by: List.of(),
                  }),
                }),
                filterComponentState: initialState.set('selectedFilterMenu', 'name'),
                partials: {
                  name: List.of(),
                },
              }
            },
          }

          const out = mq(FilterContainer, { store })

          expect(out.should.have('input')).toEqual()
        })
      })

      it('email filter should contain one input', () => {
        store = {
          getState() {
            return {
              filters: Map({
                email_address: Map({
                  type: 'email_address',
                  active: true,
                  by: List.of(),
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'email_address'),
              partials: {
                email_address: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have('input')).toEqual()
      })

      it('emloyee filter should contain one input', () => {
        store = {
          getState() {
            return {
              filters: Map({
                employee_name: Map({
                  type: 'employee_name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'employee_name'),
              partials: {
                employee_name: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have('input')).toEqual()
      })

      it('open status should contain two checkboxes', () => {
        store = {
          getState() {
            return {
              filters: Map({
                open_status: Map({
                  type: 'open_status',
                  active: true,
                  by: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'open_status'),
              partials: {
                open_status: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'input')).toEqual()
      })

      it('location filter should contain one input', () => {
        store = {
          getState() {
            return {
              filters: Map({
                location: Map({
                  type: 'location',
                  active: true,
                  by: List.of()
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'location'),
              partials: {
                location: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have('input')).toEqual()
      })

      it('opening timestamp should contain one inputs', () => {
        store = {
          getState() {
            return {
              filters: Map({
                opening_timestamp: Map({
                  type: 'opening_timestamp',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'opening_timestamp'),
              partials: {
                opening_timestamp: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(1, 'input')).toEqual()
      })

      it('closing timestamp should contain two inputs', () => {
        store = {
          getState() {
            return {
              filters: Map({
                closing_timestamp: Map({
                  type: 'closing_timestamp',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'closing_timestamp'),
              partials: {
                closing_timestamp: List.of(),
              },
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(1, 'input')).toEqual()
      })
    })

    describe('footer constructor', () => {
      it('should display Back button', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'button')).toBe()
        expect(out.should.contain('Back')).toBe()
      })

      it('should display OK button', () => {
        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'button')).toBe()
        expect(out.should.contain('OK')).toBe()
      })
    })
  })
})
