export const sendResponse = (res: any, payload: any, success: boolean = true, statusCode: number = 200) => {
  res.send({ success, payload }).status(statusCode);
}