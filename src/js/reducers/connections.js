// @flow
/* global $Shape */
import { combineReducers } from 'redux'
import {
  RECEIVE_WELCOME
} from '../actions'
import type { ConnectionT, Action } from '../flow'

function list (
  state : Array<ConnectionT> = [],
  action : Action
) : Array<ConnectionT> {
  switch (action.type) {
    case 'REQUEST_CONNECTION_PENDING':
      return updateIdInList(state, action.connection.id, action.connection)
    case 'REQUEST_CONNECTION_SUCCESS':
      return updateIdInList(state, action.connection.id, {
        isConnected: true
      })
    case 'REQUEST_CONNECTION_ERROR':
      return updateIdInList(state, action.connection.id, {
        error: action.error
      })
    case RECEIVE_WELCOME:
      return updateIdInList(state, action.connectionId, {
        isWelcome: true
      })
    default:
      return state
  }
}

function updateIdInList (
  state : Array<ConnectionT>,
  id : string,
  update : $Shape<ConnectionT>
) : Array<ConnectionT> {
  let found = false
  const result = state.map(connection => {
    if (connection.id === id) {
      found = true
      return Object.assign({}, connection, update)
    } else {
      return connection
    }
  })

  return found ? result : result.concat([ update ])
}

export default combineReducers({
  list
})
