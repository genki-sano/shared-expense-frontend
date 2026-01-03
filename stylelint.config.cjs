/** @type {import("stylelint").Config} */
module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-tailwindcss',
    'stylelint-config-recess-order',
  ],
  rules: {
    // CSS Modules: :global / :local を許可
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'local'] }],
    // Tailwind 独自 at-rule（@tailwind / @apply / @layer / @theme など）を許可
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'layer',
          'responsive',
          'screen',
          'variants',
          'config',
          'plugin',
          'theme',
        ],
      },
    ],
  },
  // prettier-ignore
  ignoreFiles: [
    '.next/**',
    'out/**',
    'build/**',
    'public/**',
  ],
}
