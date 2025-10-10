export const successResponse = (
  ctx,
  status,
  message = 'Operation successful',
  data = null,
) => {
  ctx.status(status).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (ctx, status, message, data = null) => {
  const response = {
    success: false,
    message,
  };

  if (data !== null && data !== undefined && Object.keys(data).length !== 0) {
    response.data = data;
  }

  ctx.status(status).json(response);
};
