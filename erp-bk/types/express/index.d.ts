
declare namespace Express {
  interface Request {
      role: 'admin' | 'user';
  }
}