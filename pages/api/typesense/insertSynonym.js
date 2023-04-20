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
  const synonyms = [
    ["developer", { synonyms: ["dev", "developer", "lập trình"] }],
    ["project-manager", { synonyms: ["pm", "project manager", "quản lý dự án"] }]
  ];

  const collections = client.collections('jobs');
  const upsertSynonyms = (name, syns) => collections.synonyms().upsert(name + '-synonyms', syns);

  synonyms.forEach(([name, syns]) => upsertSynonyms(name, syns));

  res.status(200).json(4);
}