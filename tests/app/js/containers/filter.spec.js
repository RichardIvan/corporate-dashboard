/* @flow */
'use strict'

import { describe, it, beforeEach } from 'mocha'
import expect from 'expect'

import mq from 'mithril-query'

import { Map } from 'immutable'

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
            }),
            filterComponentState: initialState.set('selectedFilterMenu', 'opening_timestamp'),
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
                  }),
                }),
                filterComponentState: initialState.set('selectedFilterMenu', 'name'),
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
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'email_address'),
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
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'employee_name'),
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
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'open_status'),
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
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'location'),
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have('input')).toEqual()
      })

      it('opening timestamp should contain two inputs', () => {
        store = {
          getState() {
            return {
              filters: Map({
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'opening_timestamp'),
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'input')).toEqual()
      })

      it('closing timestamp should contain two inputs', () => {
        store = {
          getState() {
            return {
              filters: Map({
                name: Map({
                  type: 'name',
                  active: true,
                }),
              }),
              filterComponentState: initialState.set('selectedFilterMenu', 'opening_timestamp'),
            }
          },
        }

        const out = mq(FilterContainer, { store })

        expect(out.should.have.at.least(2, 'input')).toEqual()
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
