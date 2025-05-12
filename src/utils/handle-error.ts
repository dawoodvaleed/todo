export const handleError = (err: unknown) => {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert('An unknown error occurred');
  }
}
