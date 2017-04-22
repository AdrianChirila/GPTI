export const HEADERS = {
  CONTENT_TYPE: {
    "Content-type": "application/json"
  },
  AUTHORIZATION: (token: string) => {
    return {
      "Authorization": `Bearer ${token}`
    }
  }
};
