const logger = {
  log: (...message: any[]) => {
    // call to any logger service like Sentry, LogRocket to log the error 
    // some message contains IP address, which has to be redact before sending
    console.log(...message);
  },
}

export {
  logger
}