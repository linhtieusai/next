const Typesense = require('typesense')

let client = new Typesense.Client({
  'nodes': [{
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http'
  }],
  'apiKey': 'Hu52dwsas2AdxdE',
  'connectionTimeoutSeconds': 2
})


export default async function handler(req, res) {
  let documents = [{
    'id': '124',
    'company_name': 'Stark Industries',
    'num_employees': 5215,
    'country': 'USA'
  }]
  
  client.collections('companies').documents().import(documents, {action: 'create'})  

//   using file
//   const documentsInJsonl = await fs.readFile("documents.jsonl");
// client.collections('companies').documents().import(documentsInJsonl, {action: 'create'});


  res.status(200).json(4);
}