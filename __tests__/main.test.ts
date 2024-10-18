/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * These should be run as if the action was called from a workflow.
 * Specifically, the inputs listed in `action.yml` should be set as environment
 * variables following the pattern `INPUT_<INPUT_NAME>`.
 */

import * as core from '@actions/core'
import * as main from '../src/main'

// Mock the action's main function
const runMock = jest.spyOn(main, 'run')

// Other utilities
const timeRegex = /^\d{2}:\d{2}:\d{2}/

// Mock the GitHub Actions core library
let debugMock: jest.SpiedFunction<typeof core.debug>
let errorMock: jest.SpiedFunction<typeof core.error>
let getInputMock: jest.SpiedFunction<typeof core.getInput>
let setFailedMock: jest.SpiedFunction<typeof core.setFailed>
let setOutputMock: jest.SpiedFunction<typeof core.setOutput>

describe('action', () => {
  jest.setTimeout(3000000)
  beforeEach(() => {
    jest.clearAllMocks()

    debugMock = jest.spyOn(core, 'debug').mockImplementation()
    errorMock = jest.spyOn(core, 'error').mockImplementation()
    getInputMock = jest.spyOn(core, 'getInput').mockImplementation()
    setFailedMock = jest.spyOn(core, 'setFailed').mockImplementation()
    setOutputMock = jest.spyOn(core, 'setOutput').mockImplementation()
  })

  it('sets the time output', async () => {
    const summary = `Additions:[\`migrations/20240423141123-seed-org-notification-type-device-unlock-confirmation-completion.js\`](diffhunk://#diff-0a5fa619c3601c8a8dd49b04c02e23c9006628b89b15367cb404f050bc3c9759R1-R58): Added new notification types for device unlock order placed and completed, including their respective external template IDs.### Updates:* [\`migrations/20240502141123-update-notification-type-device-unlock-placed.js\`](diffhunk://#diff-0c1d264e1010662d1a7ea40180c9a59415b922acc17553c9be6f508df8183b9eR1-R42): Updated the name of the 'DeviceUnlockOrderPlacedConfirmation' notification type to 'DeviceUnlockOrderPlaced'.`
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'field':
          return 'Code Change Summary'
        case 'summary':
          return summary
        case 'openai_api_key':
          return ''
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    expect(setOutputMock).toHaveBeenCalledWith('result', expect.any(String))

    // Verify that all of the core library functions were called correctly
    // expect(debugMock).toHaveBeenNthCalledWith(1, 'W aiting 500 milliseconds ...')
    // expect(debugMock).toHaveBeenNthCalledWith(
    //   2,
    //   expect.stringMatching(timeRegex)
    // )
    // expect(debugMock).toHaveBeenNthCalledWith(
    //   3,
    //   expect.stringMatching(timeRegex)
    // )
    // expect(setOutputMock).toHaveBeenNthCalledWith(
    //   1,
    //   'time',
    //   expect.stringMatching(timeRegex)
    // )
    // expect(errorMock).not.toHaveBeenCalled()
  })

  it.skip('sets a failed status', async () => {
    // Set the action's inputs as return values from core.getInput()
    getInputMock.mockImplementation(name => {
      switch (name) {
        case 'milliseconds':
          return 'this is not a number'
        case 'openai-api-key':
          return ''
        default:
          return ''
      }
    })

    await main.run()
    expect(runMock).toHaveReturned()

    // Verify that all of the core library functions were called correctly
    expect(setFailedMock).toHaveBeenNthCalledWith(
      1,
      'milliseconds not a number'
    )
    expect(errorMock).not.toHaveBeenCalled()
  })
})
