/**
 * Convert a string to camelCase
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toCamelCase(str) {
  if (!str) return str;
  
  // If it's already PascalCase, convert to camelCase by making first letter lowercase
  if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }
  
  // If it's already camelCase, return as is
  if (/^[a-z][a-zA-Z0-9]*$/.test(str) && /[A-Z]/.test(str)) {
    return str;
  }
  
  // Separate camelCase/PascalCase first, then split by delimiters
  const separated = separateCamelCase(str);
  const words = separated.split(/[-_\s]+/g).filter(w => w.length > 0);
  
  // Return early if no words
  if (words.length === 0) return '';
  
  // If only one word and it's all lowercase (coming from lowercase format), 
  // create a camelCase by capitalizing the last letter to ensure cycle continues
  if (words.length === 1) {
    const word = words[0].toLowerCase();
    if (word.length > 1) {
      // Capitalize the last character to create camelCase
      return word.slice(0, -1) + word.slice(-1).toUpperCase();
    }
    return word; // Single character, return as is
  }
  
  // First word lowercase, rest capitalized
  return words[0].toLowerCase() + 
         words.slice(1)
              .map(word => capitalizeFirstLetter(word.toLowerCase()))
              .join('');
}

/**
 * Convert a string to PascalCase
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toPascalCase(str) {
  if (!str) return str;
  
  // If it's already PascalCase, return as is
  if (/^[A-Z][a-zA-Z0-9]*$/.test(str)) {
    return str;
  }
  
  // Separate camelCase/PascalCase first, then split by delimiters
  const separated = separateCamelCase(str);
  const words = separated.split(/[-_\s]+/g).filter(w => w.length > 0);
  
  // Return early if no words
  if (words.length === 0) return '';
  
  // All words capitalized
  return words.map(word => capitalizeFirstLetter(word.toLowerCase()))
              .join('');
}

/**
 * Convert a string to snake_case
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toSnakeCase(str) {
  if (!str) return str;
  
  // Handle the case where the string is already camelCase or PascalCase
  const separated = separateCamelCase(str);
  
  // Convert to lowercase and replace spaces/dashes with underscores
  return separated.toLowerCase()
                  .replace(/\s+/g, '_')
                  .replace(/-+/g, '_');
}

/**
 * Convert a string to kebab-case
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toKebabCase(str) {
  if (!str) return str;
  
  // Handle the case where the string is already camelCase or PascalCase
  const separated = separateCamelCase(str);
  
  // Convert to lowercase and replace spaces/underscores with dashes
  return separated.toLowerCase()
                  .replace(/\s+/g, '-')
                  .replace(/_+/g, '-');
}

/**
 * Convert a string to UPPER_CASE
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toUpperCase(str) {
  if (!str) return str;
  
  // Handle the case where the string is already camelCase or PascalCase
  const separated = separateCamelCase(str);
  
  // Convert to uppercase and replace spaces/dashes with underscores
  return separated.toUpperCase()
                  .replace(/\s+/g, '_')
                  .replace(/-+/g, '_');
}

/**
 * Convert a string to lowercase
 * @param {string} str - The string to convert
 * @returns {string} - The converted string
 */
function toLowerCase(str) {
  if (!str) return str;
  
  // Handle the case where the string is already camelCase or PascalCase
  const separated = separateCamelCase(str);
  
  // Convert to lowercase and remove all separators (spaces, underscores, dashes)
  return separated.toLowerCase()
                  .replace(/[\s_-]+/g, '');
}

/**
 * Identity function (returns input unchanged)
 * @param {string} str - The input string
 * @returns {string} - The same string
 */
function identity(str) {
  return str;
}

/**
 * Capitalize the first letter of a string
 * @param {string} str - The string to capitalize
 * @returns {string} - The capitalized string
 */
function capitalizeFirstLetter(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Separate camelCase strings with spaces
 * @param {string} str - The string to separate
 * @returns {string} - The separated string
 */
function separateCamelCase(str) {
  if (!str) return str;
  
  // Insert spaces before uppercase letters that follow lowercase letters
  return str.replace(/([a-z])([A-Z])/g, '$1 $2')
            .replace(/\s+/g, ' ');
}

module.exports = {
  toCamelCase,
  toSnakeCase,
  toPascalCase,
  toKebabCase,
  toUpperCase,
  toLowerCase,
  identity
};
