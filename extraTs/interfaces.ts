interface IPuser {
  'getUsers': {
      all: string[],
      read: string[],
      write: string[],
      Delete: string[]
  };
}
export { IPuser };