// eslint.config.js
import antfu from '@antfu/eslint-config';

export default antfu({
  vue: true,
  typescript: true,
}, {
  // Remember to specify the file glob here, otherwise it might cause the vue plugin to handle non-vue files
  files: ['**/*.vue', '**/*.ts'],
  rules: {
    'style/semi': ['error', 'always'],
  },
}, {
  rules: {
    'style/semi': ['error', 'always'],
  },
});
