// Without a paid Apple Developer ID the app ships unsigned, and Apple Silicon
// refuses to launch a bundle whose signature is broken ("app is damaged").
// An ad-hoc signature fixes that, so users get the normal "Open Anyway" prompt.
const { execFileSync } = require('child_process');
const path = require('path');

exports.default = async function (context) {
  if (context.electronPlatformName !== 'darwin') return;
  const app = path.join(context.appOutDir, `${context.packager.appInfo.productFilename}.app`);
  execFileSync('codesign', ['--force', '--deep', '--sign', '-', app], { stdio: 'inherit' });
};
