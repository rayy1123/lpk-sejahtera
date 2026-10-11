import { Config } from '@remotion/cli/config';
import fs from 'fs';

// Portable browser executable resolution:
// 1. Explicit environment variable REMOTION_BROWSER_EXECUTABLE or PUPPETEER_EXECUTABLE_PATH
// 2. Default Remotion resolution (Chrome / Chromium)
// 3. Automated Windows fallback to Microsoft Edge if Google Chrome is not installed
const customBrowser = process.env.REMOTION_BROWSER_EXECUTABLE || process.env.PUPPETEER_EXECUTABLE_PATH;

if (customBrowser && fs.existsSync(customBrowser)) {
  Config.setBrowserExecutable(customBrowser);
} else if (process.platform === 'win32') {
  const chromePaths = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    `${process.env.LOCALAPPDATA || ''}\\Google\\Chrome\\Application\\chrome.exe`,
  ];
  const chromeExists = chromePaths.some((p) => p && fs.existsSync(p));

  if (!chromeExists) {
    const edgePaths = [
      'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
      'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    ];
    const foundEdge = edgePaths.find((p) => fs.existsSync(p));
    if (foundEdge) {
      Config.setBrowserExecutable(foundEdge);
    }
  }
}
