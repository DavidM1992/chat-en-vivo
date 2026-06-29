const register = async (req, res) => {
  res.send('register');
};

const login = async (req, res) => {
  res.send('login');
};

const logout = (req, res) => {
  res.send('logout');
};

export default {
  register,
  login,
  logout,
};
