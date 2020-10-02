import { format } from 'date-fns';

// Retrieve and pass the CSRF token to each HTTP request
export function setCsrfToken(document, axios) {
  const token = document.querySelector('[name="csrf-token"]').content;
  axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
}

// Enforce date format for display
export function displayDate(date) {
  return format(new Date(date), 'HH:mm aa');
}