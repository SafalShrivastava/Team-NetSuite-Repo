const crypto = require('crypto');
const fs     = require('fs');

const {
  NS_ACCOUNT_ID, NS_CONSUMER_KEY, NS_CONSUMER_SECRET,
  NS_TOKEN_ID,   NS_TOKEN_SECRET
} = process.env;

const FILES = [
  {
    local: 'NetSuite-Code/src/FileCabinet/SuiteScripts/hello_world.js',
    ns:    '/SuiteScripts/hello_world.js'
  },
];

function buildOAuthHeader(method, url) {
  const nonce     = crypto.randomBytes(16).toString('hex');
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params = {
    oauth_consumer_key:     NS_CONSUMER_KEY,
    oauth_nonce:            nonce,
    oauth_signature_method: 'HMAC-SHA256',
    oauth_timestamp:        timestamp,
    oauth_token:            NS_TOKEN_ID,
    oauth_version:          '1.0',
  };
  const base = [method, encodeURIComponent(url),
    encodeURIComponent(Object.keys(params).sort()
      .map(k => k + '=' + encodeURIComponent(params[k])).join('&'))
  ].join('&');
  const sigKey = encodeURIComponent(NS_CONSUMER_SECRET)
               + '&' + encodeURIComponent(NS_TOKEN_SECRET);
  params.oauth_signature = crypto
    .createHmac('sha256', sigKey).update(base).digest('base64');
  return 'OAuth realm="' + NS_ACCOUNT_ID + '",' +
    Object.entries(params)
      .map(([k,v]) => k + '="' + encodeURIComponent(v) + '"').join(',');
}

async function uploadFile({ local, ns }) {
  const content = fs.readFileSync(local, 'utf8');
  const url = 'https://' + NS_ACCOUNT_ID
    + '.suitetalk.api.netsuite.com/services/rest/record/v1/file';
  const auth = buildOAuthHeader('POST', url);

  console.log('─────────────────────────────────────────────');
  console.log('[MOCK] File    : ' + local);
  console.log('[MOCK] Target  : ' + ns);
  console.log('[MOCK] Size    : ' + content.length + ' bytes');
  console.log('[MOCK] Auth OK : ' + auth.substring(0, 50) + '...');
  console.log('[MOCK] Result  : 200 OK (simulated)');
}

(async () => {
  console.log('\n  NetSuite Deploy — PRACTICE MODE');
  console.log('  Account: ' + NS_ACCOUNT_ID + '\n');
  for (const f of FILES) await uploadFile(f);
  console.log('\n  Done! ' + FILES.length + ' file(s) deployed (mock)\n');
})();