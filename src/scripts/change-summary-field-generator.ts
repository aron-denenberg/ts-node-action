import OpenAI from 'openai'
// import { DatabaseUtils } from "../../utils/database/database";
// import { FileReportingUtils } from "../../utils/files/reporting";

interface AssetAttributes {
  color?: string
  displaySize?: string
  keyboard?: string
  make?: string
  memory?: string
  model?: string
  modelNumber?: string
  operatingSystem?: string
  processor?: string
  processorFrequency?: string
  storage?: string
  storageType?: string
}

interface ParsedAsset extends AssetAttributes {
  id: string
  asset_number: string
  input: string
}

type AssetRow = {
  id: string
  asset_number: string
  serial_number: string | null
  organization_id: string
  assignee_id: string | null
  depot_id: string | null
  asset_type_id: string
  product_variant_id: string | null
  color: string | null
  display_size: string
  processor: string | null
  memory: string
  storage: string | null
  keyboard: string | null
  notes: string | null
  cosmetic_condition: string
  status: string
  data_status: string
  technical_functionality: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  make: string
  model: string
  model_number: string
  warranty_expiration: Date | null
  device_assessment: string
  acumatica_id: string | null
  purchase_date: Date | null
  is_warranty_expiration_verified: boolean
  is_purchase_date_verified: boolean
  customer_note: string | null
  operating_system: string | null
  release_date: Date | null
  processor_frequency?: string | null
  storage_type?: string | null
}

// export class ModelParser {
//   aiClient: OpenAI;
//   aiAssistant: OpenAI.Beta.Assistants.Assistant;

//   cleanup: boolean = false;
//   dryRun: boolean = false;
//   port: number;
//   save: boolean = false;

//   affectedRows: { data: ParsedAsset }[] = [];
//   errorRows: { error: Error, data: ParsedAsset }[] = [];

//   constructor(params: {
//     cleanup: boolean,
//     dryRun: boolean,
//     port: number,
//     save: boolean,
//   }) {
//     this.aiClient = new OpenAI({
//       project: 'proj_lLBZGSKFIQSflXitDEjM7Aom'
//     });

//     this.cleanup = params.cleanup;
//     this.dryRun = params.dryRun;
//     this.port = params.port;
//     this.save = params.save;
//   }

export async function runAI(
  field: string,
  summary: string,
  currentValue?: string
): Promise<string> {
  let aiClient = undefined

  aiClient = new OpenAI({
    project: 'proj_PT5efXEf9orRU82fIr8tsD83'
  })

  const aiAssistant = await aiClient.beta.assistants.retrieve(
    'asst_7NlU3rsW5FWzrlKW8eZy6Lpt'
  )

  console.log(`Assistant Intialized!! ${aiAssistant}`)

  return await generateFieldFromAIAssistant(
    aiClient,
    aiAssistant,
    field,
    summary,
    currentValue
  )

  // // const assets = await this.getAllAssets();

  // const assets = [
  //   {
  //     id: '1',
  //     asset_number: '1',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '2',
  //     asset_number: '2',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '3',
  //     asset_number: '3',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '4',
  //     asset_number: '4',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '5',
  //     asset_number: '5',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '6',
  //     asset_number: '6',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '7',
  //     asset_number: '7',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '8',
  //     asset_number: '8',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '9',
  //     asset_number: '9',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  //   {
  //     id: '10',
  //     asset_number: '10',
  //     model: 'Apple MacBook Pro 13" 2019 256GB 8GB RAM i5 1.4GHz',
  //   },
  // ]

  // for (const asset of assets) {
  //   console.log(asset);

  //   // If there's no model field to parse
  //   if (!asset.model) {
  //     // Log that model was skipped
  //     console.log(`Skipping asset ${asset.asset_number}, no model value`);

  //     continue;
  //   }

  //   console.log(`Parsing model field for asset: ${asset.asset_number}`);

  //   try {
  //     // Parse attributes from model field
  //     await this.processAsset(asset, thread);
  //   } catch (error) {
  //     // Log error and add to error rows
  //     console.error(error);

  //     this.errorRows.push({
  //       error,
  //       data: {
  //         asset_number: asset.asset_number,
  //         id: asset.id,
  //         input: asset.model,
  //       },
  //     });
  //   }
  // }

  // console.log(this.affectedRows);

  // return {
  //   errors: this.errorRows,
  //   successes: this.affectedRows,
  // }

  // FileReportingUtils.generateSuccessAndErrorFiles<ParsedAsset>({
  //   baseFileName: 'model-attribute-mapping',
  //   errors: {
  //     rows: this.errorRows,
  //     columns: [
  //       'asset_number',
  //       'id',
  //       'input',
  //     ],
  //   },
  //   successes: {
  //     rows: this.affectedRows,
  //     columns: [
  //       'asset_number',
  //       'id',
  //       'input',
  //       'color',
  //       'displaySize',
  //       'keyboard',
  //       'make',
  //       'model',
  //       'memory',
  //       'modelNumber',
  //       'operatingSystem',
  //       'processor',
  //       'processorFrequency',
  //       'storage',
  //       'storageType',
  //     ],
  //   },
  // });
}

// private async processAsset(asset: any, thread: OpenAI.Beta.Threads.Thread) {
//   let attributes = await this.parseModelFieldAttributes(thread, asset.model);

//   // if (this.save) {
//   //   // Update asset fields with parsed attributes
//   //   await this.updateAsset(asset.id, attributes);
//   // }

//   // Add the record to the affected asset array for success logging
//   this.affectedRows.push({
//     data: {
//       asset_number: asset.asset_number,
//       id: asset.id,
//       input: asset.model,
//       color: attributes.color,
//       displaySize: attributes.displaySize,
//       keyboard: attributes.keyboard,
//       make: attributes.make,
//       model: attributes.model,
//       memory: attributes.memory,
//       modelNumber: attributes.modelNumber,
//       operatingSystem: attributes.operatingSystem,
//       processor: attributes.processor,
//       processorFrequency: attributes.processorFrequency,
//       storage: attributes.storage,
//       storageType: attributes.storageType,
//     },
//   });
// }

// private async updateAsset(assetId: string, attributes: AssetAttributes) {
//   const databaseClient = await DatabaseUtils.getMonoDatabaseClient(this.port);
//   await databaseClient.connect();

//   let {
//     query,
//     params
//   } = DatabaseUtils.getUpdateParams('asset', attributes);

//   console.log(query);

//   await databaseClient.query(
//     query,
//     params
//   );

//   databaseClient.end();
// }

// async getAllAssets(): Promise<AssetRow[]> {
//   const databaseClient = await DatabaseUtils.getMonoDatabaseClient(this.port);
//   await databaseClient.connect();

//   console.log('Loading assets...');

//   let result = await databaseClient.query(
//     `SELECT * FROM asset where organization_id = '8ed6db58-7416-4e59-a247-fde568e93e57' order by created_at desc limit 500;`,
//   );

//   databaseClient.end();

//   return result.rows;
// }

async function generateFieldFromAIAssistant(
  aiClient: OpenAI,
  aiAssistant: OpenAI.Beta.Assistants.Assistant,
  field: string,
  summary: string,
  currentValue?: string
): Promise<string> {
  const thread = await aiClient.beta.threads.create({
    messages: [
      {
        // Sometimes the parser includes extra fluff text in the response, so we need to filter it out
        role: 'user' as 'user',
        content: `Parse the following text into the "${field}" field of the Change Summary document: ${summary}`
      },
      ...(currentValue
        ? [
            {
              role: 'user' as 'user',
              content: `The current value of the "${field}" field is: ${currentValue}. Please update this value.`
            }
          ]
        : [])
    ]
  })

  const run = await aiClient.beta.threads.runs.create(thread.id, {
    assistant_id: aiAssistant.id
  })

  let runStatus = await aiClient.beta.threads.runs.retrieve(thread.id, run.id)

  while (runStatus.status !== 'completed') {
    await new Promise(resolve => setTimeout(resolve, 2000))
    runStatus = await aiClient.beta.threads.runs.retrieve(thread.id, run.id)
  }

  const messages = await aiClient.beta.threads.messages.list(thread.id)

  const lastMessageForRun = messages.data
    .filter(
      message => message.run_id === run.id && message.role === 'assistant'
    )
    .pop()

  const response = lastMessageForRun?.content.filter(
    val => val.type === 'text'
  )[0].text?.value

  if (!response) {
    throw new Error(
      `Unexpected value returned by AI parser: ${lastMessageForRun?.content.filter(val => val.type === 'text')[0].text?.value}`
    )
  }

  console.log(response)

  return response
}

// async getModelMessageIdFromThread(thread: OpenAI.Beta.Threads.Thread): Promise<string | undefined> {
//   const messages = await this.aiClient.beta.threads.messages.list(thread.id);

//   const modelMessage = messages.data.find((message) => {
//     return message.content[0]['text']?.value?.includes('Map the following line of text into a JSON');
//   });

//   return modelMessage?.id;
// }

// async parseModelFieldAttributes(thread: OpenAI.Beta.Threads.Thread, model: string): Promise<AssetAttributes> {
//   // const modelMessageId = await this.getModelMessageIdFromThread(thread);

//   // if (!modelMessageId) {
//   //   throw new Error('Model message not found in thread');
//   // }

//   await this.aiClient.beta.threads.messages.create(thread.id,
//       {
//         role: 'user',
//         content: `Map the following line of text into a JSON string with the color, display size, keyboard, make, model, memory, model number, operating system, processor, processor frequency, storage, and storage type fields defined in the allwhere asset data standard: ${model}`,
//       },
//   );

//   const run = await this.aiClient.beta.threads.runs.create(thread.id, {
//     assistant_id: this.aiAssistant.id,
//   });

//   let runStatus = await this.aiClient.beta.threads.runs.retrieve(
//     thread.id,
//     run.id
//   );

//   while (runStatus.status !== "completed") {
//     await new Promise((resolve) => setTimeout(resolve, 2000));
//     runStatus = await this.aiClient.beta.threads.runs.retrieve(thread.id, run.id);
//   }

//   const messages = await this.aiClient.beta.threads.messages.list(thread.id);

//   const lastMessageForRun: OpenAI.Beta.Threads.Messages.Message | undefined = messages.data
//       .filter(
//         (message) => message.run_id === run.id && message.role === "assistant"
//       )
//       .pop();

//   const response = lastMessageForRun?.content[0].text?.value?.match(/\{[^}]*\}/g)?.[0];

//   if (!response) {
//     throw new Error(`Unexpected value returned by AI parser: ${lastMessageForRun?.content[0]['text']?.value}`);
//   }

//   console.log(response);

//   const attributes = JSON.parse(response);

//   return {
//     ...(attributes.color && { color: attributes.color }),
//     ...(attributes.displaySize && { displaySize: attributes.displaySize }),
//     ...(attributes.keyboard && { keyboard: attributes.keyboard }),
//     ...(attributes.make && { make: attributes.make }),
//     ...((attributes.model && this.cleanup) && { model: attributes.model }),
//     ...(attributes.memory && { memory: attributes.memory }),
//     ...(attributes.modelNumber && { modelNumber: attributes.modelNumber }),
//     ...(attributes.operatingSystem && { operatingSystem: attributes.operatingSystem }),
//     ...(attributes.processor && { processor: attributes.processor }),
//     ...(attributes.processorFrequency && { processorFrequency: attributes.processorFrequency }),
//     ...(attributes.storage && { storage: attributes.storage }),
//     ...(attributes.storageType && { storageType: attributes.storageType }),
//   };
// }
