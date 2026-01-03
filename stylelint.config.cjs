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
  },
  // prettier-ignore
  ignoreFiles: [
    '.next/**',
    'out/**',
    'build/**',
    'public/**'
],
}
