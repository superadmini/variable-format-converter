# Variable Format Converter

This extension allows you to easily convert variable names between different naming conventions.

## Features

Convert selected text or word under cursor between these formats:
- camelCase
- PascalCase
- snake_case
- kebab-case
- UPPER_CASE

## How to Use

1. Select text you want to convert, or place cursor on a word
2. Right-click and select "Convert Variable Format" from context menu
3. Choose the target format from the dropdown

Alternatively, you can use the command palette (Ctrl+Shift+P or Cmd+Shift+P) and search for:
- "Convert to camelCase"
- "Convert to snake_case"
- "Convert to PascalCase"
- "Convert to kebab-case"
- "Convert to UPPER_CASE"

## Supported Conversions

The extension can convert between various formats:
- space-separated words: `hello world`
- underscore-separated words: `hello_world`
- dash-separated words: `hello-world`
- camelCase: `helloWorld`
- PascalCase: `HelloWorld`
- UPPER_CASE: `HELLO_WORLD`

## Example

Converting `hello-world`:
- camelCase: `helloWorld`
- PascalCase: `HelloWorld`
- snake_case: `hello_world`
- kebab-case: `hello-world`
- UPPER_CASE: `HELLO_WORLD`