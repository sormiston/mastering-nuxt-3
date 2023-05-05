export default defineEventHandler((evt) => {
  // do nothing if process log-level does not equal http
  const runtimeConfig = useRuntimeConfig();
  if (runtimeConfig.httpLogs === 'none') {
    return;
  }

  const logger = getWinstonInstance();
  const {
    node: { req },
  } = evt;

  const reducedRequest = {
    method: req.method,
    url: req.url,
    headers: req.headers,
  };

  logger.http(JSON.stringify(reducedRequest, null, 2));
});
