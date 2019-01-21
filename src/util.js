const LAST_ID_KEY = 'vuex-last-id';
let lastId = sessionStorage ? sessionStorage.getItem(LAST_ID_KEY) || 0 : 0;

export const createTodo = (text, done = false) => {
  ++lastId;
  if (sessionStorage) sessionStorage.setItem(LAST_ID_KEY, lastId);
  return {id: lastId, text, done};
};
