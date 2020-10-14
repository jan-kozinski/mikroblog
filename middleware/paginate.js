function paginateResults(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    //If the page or limit is not specified asign it a defualt value
    if (!page || !limit) {
      return res.redirect(
        `/api/mikroblog?page=${page ? page : 1}&limit=${limit ? limit : 10}`
      );
    }
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec()))
      results.nextPage = {
        page: page + 1,
        limit,
      };

    if (startIndex > 0)
      results.prevPage = {
        page: page - 1,
        limit,
      };

    try {
      results.currentPagePosts = await model
        .find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(startIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (error) {
      res.status(500).json({ error });
    }
  };
}

module.exports = paginateResults;
