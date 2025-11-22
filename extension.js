// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// Import our converter functions
const { 
  toCamelCase, 
  toSnakeCase, 
  toPascalCase, 
  toKebabCase, 
  toUpperCase,
  toLowerCase
} = require('./converter.js');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed



/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "variable-format-converter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  
  let disposableCamelCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToCamelCase', function () {
    convertVariable(toCamelCase);
  });

  let disposableSnakeCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToSnakeCase', function () {
    convertVariable(toSnakeCase);
  });

  let disposablePascalCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToPascalCase', function () {
    convertVariable(toPascalCase);
  });

  let disposableKebabCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToKebabCase', function () {
    convertVariable(toKebabCase);
  });

  let disposableUpperCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToUpperCase', function () {
    convertVariable(toUpperCase);
  });

  let disposableLowerCase = vscode.commands.registerCommand('adminVariableFormatConverter.convertToLowerCase', function () {
    convertVariable(toLowerCase);
  });

  let disposableCircleChange = vscode.commands.registerCommand('adminVariableFormatConverter.circleChange', function () {
    circleChangeFormat();
  });

  let disposableConvertVariable = vscode.commands.registerCommand('adminVariableFormatConverter.convertVariable', async function () {
    const formats = ['camelCase', 'snake_case', 'PascalCase', 'kebab-case', 'UPPER_CASE', 'lowercase'];
    const choice = await vscode.window.showQuickPick(formats, {
      placeHolder: 'Select target format'
    });

    if (!choice) return;

    switch (choice) {
      case 'camelCase':
        convertVariable(toCamelCase);
        break;
      case 'snake_case':
        convertVariable(toSnakeCase);
        break;
      case 'PascalCase':
        convertVariable(toPascalCase);
        break;
      case 'kebab-case':
        convertVariable(toKebabCase);
        break;
      case 'UPPER_CASE':
        convertVariable(toUpperCase);
        break;
      case 'lowercase':
        convertVariable(toLowerCase);
        break;
    }
  });

  context.subscriptions.push(disposableCamelCase);
  context.subscriptions.push(disposableSnakeCase);
  context.subscriptions.push(disposablePascalCase);
  context.subscriptions.push(disposableKebabCase);
  context.subscriptions.push(disposableUpperCase);
  context.subscriptions.push(disposableLowerCase);
  context.subscriptions.push(disposableCircleChange);
  context.subscriptions.push(disposableConvertVariable);
}

/**
 * Detect the current format of a variable
 * @param {string} text - The text to analyze
 * @returns {string} - The detected format name
 */
function detectFormat(text) {
  if (!text) return 'unknown';
  
  // Check for UPPER_CASE (all uppercase with underscores)
  if (/^[A-Z][A-Z0-9]*(_[A-Z0-9]+)*$/.test(text)) {
    return 'UPPER_CASE';
  }
  
  // Check for snake_case (all lowercase with underscores, must contain at least one underscore)
  if (/^[a-z][a-z0-9]*(_[a-z0-9]+)+$/.test(text)) {
    return 'snake_case';
  }
  
  // Check for kebab-case (all lowercase with dashes, must contain at least one dash)
  if (/^[a-z][a-z0-9]*(-[a-z0-9]+)+$/.test(text)) {
    return 'kebab-case';
  }
  
  // Check for PascalCase (starts with uppercase, no separators, contains at least one lowercase)
  if (/^[A-Z][a-zA-Z0-9]*$/.test(text) && /[a-z]/.test(text)) {
    return 'PascalCase';
  }
  
  // Check for lowercase (all lowercase, no separators, no uppercase letters, at least 2 chars)
  if (/^[a-z][a-z0-9]*$/.test(text) && !/[A-Z]/.test(text) && text.length > 1) {
    return 'lowercase';
  }
  
  // Check for camelCase (starts with lowercase, contains uppercase)
  if (/^[a-z][a-zA-Z0-9]*$/.test(text) && /[A-Z]/.test(text)) {
    return 'camelCase';
  }
  
  return 'unknown';
}

/**
 * Circle through different variable formats
 */
function circleChangeFormat() {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    vscode.window.showErrorMessage('No active text editor found!');
    return;
  }

  const formats = [
    { name: 'camelCase', func: toCamelCase },
    { name: 'PascalCase', func: toPascalCase },
    { name: 'snake_case', func: toSnakeCase },
    { name: 'UPPER_CASE', func: toUpperCase },
    { name: 'kebab-case', func: toKebabCase },
    { name: 'lowercase', func: toLowerCase }
  ];

  // Get the selected text or word under cursor
  let originalText = '';
  const selection = editor.selection;
  
  if (selection.isEmpty) {
    const wordRange = editor.document.getWordRangeAtPosition(selection.active);
    if (wordRange) {
      originalText = editor.document.getText(wordRange);
    }
  } else {
    originalText = editor.document.getText(selection);
  }

  if (!originalText) {
    vscode.window.showWarningMessage('No text selected or word found under cursor!');
    return;
  }

  // Detect current format
  const currentFormat = detectFormat(originalText);
  
  // Find the index of current format in the formats array
  let currentIndex = 0;
  if (currentFormat !== 'unknown') {
    currentIndex = formats.findIndex(f => f.name === currentFormat);
    if (currentIndex === -1) currentIndex = 0;
  }
  
  // Move to next format
  let nextIndex = (currentIndex + 1) % formats.length;
  
  // Convert to next format
  const nextFormat = formats[nextIndex];
  
  // Apply the conversion directly to avoid issues with convertVariable function
  editor.edit(editBuilder => {
    if (selection.isEmpty) {
      const wordRange = editor.document.getWordRangeAtPosition(selection.active);
      if (wordRange) {
        const converted = nextFormat.func(originalText);
        editBuilder.replace(wordRange, converted);
      }
    } else {
      const converted = nextFormat.func(originalText);
      editBuilder.replace(selection, converted);
    }
  });
  
  // Show notification
  vscode.window.showInformationMessage(`Converted from ${currentFormat} to ${nextFormat.name}`);
}



/**
 * Convert selected text using the provided conversion function
 * @param {Function} converterFunction - The conversion function to use
 */
function convertVariable(converterFunction) {
  const editor = vscode.window.activeTextEditor;
  
  if (!editor) {
    vscode.window.showErrorMessage('No active text editor found!');
    return;
  }

  const selections = editor.selections;
  const document = editor.document;

  editor.edit(editBuilder => {
    selections.forEach(selection => {
      let originalText = '';
      let targetRange = null;
      
      if (selection.isEmpty) {
        // If no text is selected, try to get the word under cursor
        const wordRange = document.getWordRangeAtPosition(selection.active);
        if (wordRange) {
          originalText = document.getText(wordRange);
          targetRange = wordRange;
        }
      } else {
        // If text is selected, convert the selected text
        originalText = document.getText(selection);
        targetRange = selection;
      }
      
      if (originalText && targetRange) {
        const converted = converterFunction(originalText);
        
        editBuilder.replace(targetRange, converted);
      }
    });
  });
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate
}
