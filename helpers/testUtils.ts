// Generate a unique product code and title for each test run
export function generateUniqueProductCodeAndTitle() {
  return `test-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
}
