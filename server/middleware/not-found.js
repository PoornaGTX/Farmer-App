const notFound = (req, res) => {
  return res.status(404).send({ err: "page not found" });
};

module.exports = notFound;
