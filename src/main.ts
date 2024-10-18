import * as core from '@actions/core'
import { runAI } from './scripts/model-parser'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const ms: string = core.getInput('milliseconds');

    // core.exportVariable('OPENAI_API_KEY', core.getInput('openai-api-key'));

    core.setOutput('result', 'Test output');

    // core.exportVariable('OPENAI_API_KEY', core.getInput('openai-api)

    // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
    // core.debug(`Waiting ${ms} milliseconds ...`)

    // // Log the current timestamp, wait, then log the new timestamp
    // core.debug(new Date().toTimeString())
    // await wait(parseInt(ms, 10))
    // core.debug(new Date().toTimeString()) ..

    // const result = await runAI();

    // Set outputs for other workflow steps to use
    // core.setOutput('result', 'Test output');
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
