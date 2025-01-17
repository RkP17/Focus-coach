module.exports = {
    globals: {
      chrome: 'readonly',  // This will prevent ESLint from flagging the chrome object as undefined
    },
    env: {
      browser: true,   // Ensure that ESLint knows you're working with browser-related code (like `chrome` APIs)
      node: true,
    },
    extends: ['eslint:recommended'],
    rules: {
        'no-undef': 'error', // Ensure all undefined variables are caught (except chrome)
        'no-unused-vars': 'warn', // Warn about unused variables
    },
    
  };
  