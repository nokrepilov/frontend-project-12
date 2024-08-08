const userId = 'userId';

export const setItemStorage = (data, nameId = userId) => {
  const stringifiedData = JSON.stringify(data);
  localStorage.setItem(nameId, stringifiedData);
};

export const getItemStorage = (nameId = userId) => {
  const data = localStorage.getItem(nameId);
  return JSON.parse(data);
};

export const clearStorage = (nameId = userId) => {
  localStorage.removeItem(nameId);
};
