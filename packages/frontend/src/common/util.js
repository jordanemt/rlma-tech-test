export function formatDate({ dateString, options = null }) {
  const date = new Date(dateString);
  return date.toLocaleDateString(
    'en-US',
    options || {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }
  );
}
