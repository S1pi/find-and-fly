const getUserByUsername = async (username: string) => {
  // This function would normally query a database
  // for a user with the given username

  // Mock user object
  return {
    id: 1,
    username: 'testuser',
    email: 'dwadwd@dwadw.dawd',
    password: '$2a$10$7z5g4r2FyWZ3w9J5qZ9QWu8fX9V5Z9U4E5Z',
    role: 'user',
    created_at: new Date(),
  };
};

export {getUserByUsername};
