export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg-deep': 'var(--color-dark-bg-deep)',
        'dark-bg-primary': 'var(--color-dark-bg-primary)',
        'dark-bg-secondary': 'var(--color-dark-bg-secondary)',
        'dark-bg-accent': 'var(--color-dark-bg-accent)',
        'dark-border': 'var(--color-dark-border)',
        'dark-border-light': 'var(--color-dark-border-light)',
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'secondary': 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'error-bg': 'var(--color-error-bg)',
        'error-text': 'var(--color-error-text)',
        'error-border': 'var(--color-error-border)',
        'user-bg': 'var(--color-user-bg)',
        'user-border': 'var(--color-user-border)',
        'user-text': 'var(--color-user-text)',
        'user-time': 'var(--color-user-time)',
        'ai-text': 'var(--color-ai-text)',
        'ai-label': 'var(--color-ai-label)',
        'ai-time': 'var(--color-ai-time)',
      },
    },
  },
}
