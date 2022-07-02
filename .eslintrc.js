module.exports = {
    root: true,
  
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      parser: "@babel/eslint-parser",
      ecmaVersion: 2017,
    },
  
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    },
  
    extends: [
      "plugin:vue/vue3-recommended",
      //"plugin:vue/vue3-essential",
      //"@vue/standard",
    ],
  };
  