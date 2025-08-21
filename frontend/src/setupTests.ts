import '@testing-library/jest-dom'

// React Hook FormとMUIの警告を抑制
const originalError = console.error
console.error = (...args: unknown[]) => {
  // React Hook FormとMUIのact()警告を抑制
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('not wrapped in act(...)') ||
      args[0].includes(
        'The current testing environment is not configured to support act'
      ))
  ) {
    return
  }
  originalError(...args)
}
