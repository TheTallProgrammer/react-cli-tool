const fs = require('fs');

const modifyIndexJs = () => {
  const indexPath = `src/index.js`;
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  // Split the content into an array of lines
  let lines = indexContent.split('\n');

  // Filter out the lines you want to remove
  lines = lines.filter(line => {
    // Remove lines that are single-line comments or contain certain strings
    return !(
      line.trim().startsWith('//') || // Checks if the line is a single-line comment
      line.includes('reportWebVitals') ||
      line.includes('index.css')
    );
  });

  // Join the array back into a single string
  indexContent = lines.join('\n');

  // Write the modified content back to index.js
  fs.writeFileSync(indexPath, indexContent);
};

const modifyAppCss = () => {
    const appCssPath = `src/App.css`;
    // Clear the content of App.css
    fs.writeFileSync(appCssPath, ''); 
};
  

const modifyAppJs = () => {
  const appJsPath = `src/App.js`;
  const newAppJsContent = 
`import './App.css';
  
function App() {
  return (
    <div className="App">
    </div>
  );
}

export default App;`;
  // Write the new content to App.js, replacing the existing content

  // Write the modified content back to App.js
  fs.writeFileSync(appJsPath, newAppJsContent);
};

module.exports = {
  modifyIndexJs,
  modifyAppCss,
  modifyAppJs,
};
