/**
 * Async error handler wrapper
 * Eliminates the need for try/catch blocks in every controller
 */
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

export default catchAsync;
