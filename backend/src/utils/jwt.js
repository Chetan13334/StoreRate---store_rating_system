export const createToken = (payload) => {
  return `token:${Buffer.from(JSON.stringify(payload)).toString('base64')}`;
};

export const verifyToken = (token) => {
  if (!token) return null;
  try {
    return JSON.parse(Buffer.from(token.replace('token:', ''), 'base64').toString('utf8'));
  } catch {
    return null;
  }
};
