module.exports = {
  default: {
    import: ['dist-bdd/tests/steps/**/*.js', 'dist-bdd/tests/support/**/*.js'],
    paths: ['tests/features/**/*.feature'],
    format: ['progress', 'html:test-results/cucumber-report.html'],
    timeout: 30000,
    tags: process.env.TAGS || ''
  }
};
