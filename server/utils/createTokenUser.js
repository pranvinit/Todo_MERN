const createTokenUser = (user) => {
  return {
    userId: user._id,
    name: user.name,
  };
};
module.exports = createTokenUser;
