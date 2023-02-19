const validateJWT = (token, secret, jwt) => {
  try {
    // Verify the token and decode the payload
    const payload = jwt.verify(token, secret);

    // If verification is successful, return the payload and null error message
    return { payload, error: null };
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      console.error('JWT validation error');
      return { payload: null, error: 'Token expired' };
    } else if (err instanceof jwt.JsonWebTokenError) {
      console.error('JWT validation error:');
      return { payload: null, error: 'Invalid token' };
    } else {
      console.error('JWT validation error:');
      return { payload: null, error: 'Unknown error' };
    }
  }
}

module.exports = {
  validateJWT: validateJWT
};

