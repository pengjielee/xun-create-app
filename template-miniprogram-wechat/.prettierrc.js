module.exports = {
  printWidth: 100, // 一行最大多少字符
  tabWidth: 2, // tab占用的字符数
  useTabs: false, // 是否使用tab代替空格
  semi: true, // 是否每句后都加分号
  singleQuote: true, // 是否使用单引号
  trailingComma: 'all', // 数组尾逗号
  bracketSpacing: true, // {foo: xx}还是{ foo: xx }
  overrides: [
    {
      files: '*.wxml',
      options: {
        parser: 'html',
      },
    },
  ],
};
