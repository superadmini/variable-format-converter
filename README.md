# Variable Format Converter

This extension allows you to easily convert variable names between different naming conventions.

## Features

Convert selected text or word under cursor between these formats:
- camelCase
- PascalCase
- snake_case
- kebab-case
- UPPER_CASE
- lowercase

### 🔄 Circle Change Mode

Quickly cycle through different formats with a single command! Perfect for exploring different naming styles.

**How it works:**
- Press the keyboard shortcut or run "Circle Change Format" command
- The variable will automatically cycle through formats in order:
  - camelCase → PascalCase → snake_case → UPPER_CASE → kebab-case → (back to camelCase)

**Example:**
- Start with: `HelloWorld` (PascalCase)
- First press: `hello_world` (snake_case)
- Second press: `HELLO_WORLD` (UPPER_CASE)
- Third press: `hello-world` (kebab-case)
- Fourth press: `helloWorld` (camelCase)
- Fifth press: `HelloWorld` (PascalCase) - back to start!

## How to Use

### Method 1: Context Menu
1. Select text you want to convert, or place cursor on a word
2. Right-click and select "Convert Variable Format" from context menu
3. Choose the target format from the dropdown

### Method 2: Command Palette
Use the command palette (Ctrl+Shift+P or Cmd+Shift+P) and search for:
- **"Circle Change Format"** - Cycle through all formats
- "Convert to camelCase"
- "Convert to PascalCase"
- "Convert to snake_case"
- "Convert to kebab-case"
- "Convert to UPPER_CASE"
- "Convert to lowercase"

### Method 3: Keyboard Shortcut (Recommended for Circle Change)
You can assign a keyboard shortcut to "Circle Change Format" for quick access:
1. Open Keyboard Shortcuts (Ctrl+K Ctrl+S or Cmd+K Cmd+S)
2. Search for "Circle Change"
3. Assign your preferred shortcut (e.g., Ctrl+Shift+C or Cmd+Shift+C)

## Supported Conversions

The extension can convert between various formats:
- space-separated words: `hello world`
- underscore-separated words: `hello_world`
- dash-separated words: `hello-world`
- camelCase: `helloWorld`
- PascalCase: `HelloWorld`
- UPPER_CASE: `HELLO_WORLD`
- lowercase: `helloworld`

## Examples

### Converting `hello-world`:
- camelCase: `helloWorld`
- PascalCase: `HelloWorld`
- snake_case: `hello_world`
- kebab-case: `hello-world`
- UPPER_CASE: `HELLO_WORLD`
- lowercase: `helloworld`

### Converting `getUserById`:
- camelCase: `getUserById`
- PascalCase: `GetUserById`
- snake_case: `get_user_by_id`
- kebab-case: `get-user-by-id`
- UPPER_CASE: `GET_USER_BY_ID`
- lowercase: `getuserbyid`

## Tips

- 💡 Use **Circle Change** to quickly preview all format options
- 💡 Works with multiple selections at once
- 💡 If no text is selected, it will convert the word under cursor
- 💡 Smart detection automatically identifies the current format