import * as core from '@actions/core'
import { runAI } from './scripts/change-summary-field-generator'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput('milliseconds');

    const apiKey = core.getInput('openai_api_key')
    const field = core.getInput('field')
    const summary = core.getInput('summary')
    const existingValue = core.getInput('existing_value')

    core.info(`API Key: ${apiKey}`)

    console.log(`API Key: ${apiKey}`)

    core.exportVariable('OPENAI_API_KEY', apiKey)

    // core.setOutput('result', 'Test output')

    // core.exportVariable('OPENAI_API_KEY', core.getInput('openai-api)

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString()) ..

    const result = await runAI(field, summary, existingValue)

    // Set outputs for other workflow steps to use
    core.setOutput('result', result)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
