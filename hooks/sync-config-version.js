// Cordova before_prepare hook (declared in config.xml): copies the version in
// www/version.json onto <widget version> in config.xml, so the app is built with
// the version of the site in www/. master's gulp build writes version.json from
// its package.json, and it arrives here with the merge of gh-pages (npm run
// update-cordova on master). Before a release has version.json, it falls back
// to package.json here.
const fs = require("fs");
const path = require("path");

module.exports = function (context) {
  const root = context.opts.projectRoot;
  const configPath = path.join(root, "config.xml");
  const versionPath = path.join(root, "www", "version.json");
  const source = fs.existsSync(versionPath) ? versionPath : path.join(root, "package.json");
  const { version } = JSON.parse(fs.readFileSync(source, "utf8"));
  // Cordova turns this into the iOS short version (digits and dots only) and the
  // Android versionCode, which can't tell a prerelease from its release.
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    throw new Error(`sync-config-version: version "${version}" in ${path.relative(root, source)} must be plain major.minor.patch for the app`);
  }
  const xml = fs.readFileSync(configPath, "utf8");
  let found = false;
  const updated = xml.replace(/(<widget\b[^>]*?\sversion=)(["'])[^"']*\2/, (m, attr, quote) => {
    found = true;
    return attr + quote + version + quote;
  });
  if (!found) throw new Error("sync-config-version: no version attribute on <widget> in config.xml");
  if (updated !== xml) {
    fs.writeFileSync(configPath, updated);
    console.log(`config.xml version -> ${version}`);
  }
};
