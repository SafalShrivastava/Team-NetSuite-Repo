const { execSync } = require('child_process');
const fs = require('fs');

console.log('\n  NetSuite SDF Deploy — DRY RUN MODE\n');

// Check SuiteCloud CLI is installed
try {
  const version = execSync('suitecloud --version').toString().trim();
  console.log('  SuiteCloud CLI version : ' + version);
} catch (e) {
  console.log('  [DRY RUN] SuiteCloud CLI would be installed here');
}

// Check deploy.xml exists
const deployXml = 'NetSuite-Code/deploy.xml';
if (fs.existsSync(deployXml)) {
  console.log('  deploy.xml found       : ✓');
  console.log('  deploy.xml content     :');
  console.log(fs.readFileSync(deployXml, 'utf8'));
} else {
  console.log('  [DRY RUN] deploy.xml not found');
}

// Show what command would run
console.log('\n  Command that will run in production:');
console.log('  > suitecloud project:deploy --no-preview');
console.log('  > working directory: NetSuite-Code/');
console.log('\n  Credentials needed:');
console.log('  NS_ACCOUNT_ID      : ' + (process.env.NS_ACCOUNT_ID || 'not set'));
console.log('  NS_TOKEN_ID        : ' + (process.env.NS_TOKEN_ID ? '***set***' : 'not set'));
console.log('  NS_TOKEN_SECRET    : ' + (process.env.NS_TOKEN_SECRET ? '***set***' : 'not set'));
console.log('  NS_CONSUMER_KEY    : ' + (process.env.NS_CONSUMER_KEY ? '***set***' : 'not set'));
console.log('  NS_CONSUMER_SECRET : ' + (process.env.NS_CONSUMER_SECRET ? '***set***' : 'not set'));

console.log('\n  [DRY RUN] Deploy simulation complete!');
console.log('  Add real TBA credentials to GitHub Secrets to go live.\n');