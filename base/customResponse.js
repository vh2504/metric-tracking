const { responseCode } = require("./responseCode")

const successResponseObj = (message, data) => {
  if (data?.paginate?.page) {
    return successResponsePaginateObj(message, data.data, data.paginate)
  }

  return {
    success: true,
    message,
    data
  }
}

const successResponsePaginateObj = (message, data, paginate) => ({
  success: true,
  message,
  data,
  paginate
})

const errorResponseObj = (message, error) => ({
  success: false,
  error,
  message
})

const customResponse = async (req, res, next) => {

  /**
   * @param data 
   * @param message 
   * @param statusCode 
   */
  res.success = (data = null, message = responseCode.SUCCESS.name, statusCode = responseCode.SUCCESS.code) => {
    const response = successResponseObj(message, data);
    if (statusCode < 200 || statusCode > 299) statusCode = responseCode.SUCCESS.code
    return res.status(statusCode).json(response)
  }

  /**
   * @param error 
   * @param message 
   * @param statusCode 
   */
  res.error = (error = responseCode.SERVER.name, message = 'Failed', statusCode = 200) => {
    const response = errorResponseObj(message, error)
    if (statusCode >= 200 && statusCode <= 299) statusCode = 500
    return res.status(statusCode).json(response)
  }

  next();
}

module.exports = {
  customResponse,
}
