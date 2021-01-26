const getTimeString = (): string => {
  return new Date().toISOString();
};

const logger = (NAMESPACE: string, log: string, options?: object): void => {
  options ? console.log(`[${getTimeString()}] ${NAMESPACE} - [INFO] - ${log}`, options) : console.log(`[${getTimeString()}] ${NAMESPACE} - [INFO] - ${log}`);
};

export default logger;
