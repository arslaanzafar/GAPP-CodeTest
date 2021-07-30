export function paginate(model, limit) {
    return async (req, res, next) => {
      const page = parseInt(req.query.page);
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
  
      let totalPages = 0;
  
      const search = req.query.q;
  
      const result = {};
  
      totalPages = Math.ceil((await model.countDocuments().exec()) / limit)
      result.total = { totalPages, }
  
  
      if (endIndex < (await model.countDocuments().exec())) {
        result.next = {
          page: page + 1,
          limit: limit,
        };
      }
  
      if (startIndex > 0) {
        result.previous = {
          page: page - 1,
          limit: limit,
        };
      }
  
      try {

        result.results = await model.find().limit(limit).skip(startIndex);
  
        res.paginatedResult = result;
        next();
      } catch (e) {
        res.status(500).json([ErrorMessage.SERVER_ERROR]);
      }
    };
  }
  
export default paginate