const deleteToken = () => {
  document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export default deleteToken;
