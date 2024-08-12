const responseObject = (res, result, status) => {
  if (!res.headersSent) {
    return res.status(status).json({
      statusCode: status,
      data: result,
    });
  }
  return;
};

const BaseController = {
  unauthorized: res => responseObject(res, { message: 'Unauthorized' }, 401),
  success: (res, data = 'success') => responseObject(res, data, 200),
  notFound: res => responseObject(res, { message: 'Item not found' }, 404),
  error: (res, error) => responseObject(res, { message: error }, 422),
  response: (res, message, code = 200) =>
    responseObject(res, { message }, code),
};

module.exports = BaseController;
