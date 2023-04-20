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

let schema = {
    'name': 'companies',
    'num_documents': 0,
    'fields': [
      {
        'name': 'company_name',
        'type': 'string',
        'facet': false
      },
      {
        'name': 'num_employees',
        'type': 'int32',
        'facet': false
      },
      {
        'name': 'country',
        'type': 'string',
        'facet': true
      }
    ],
    'default_sorting_field': 'num_employees'
  }
  

export default async function handler(req, res) {
  // const response = client.collections().create(schema);
  // console.log(response);
  console.log(await client.collections('companies').retrieve());

  res.status(200).json(4);
}