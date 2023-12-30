const setAccessToken = (value) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + 60 * 60 * 1000);

  const cookieValue = `token=${value}; expires=${expires.toUTCString()}; path=/`;
  document.cookie = cookieValue;
};

export default setAccessToken;
