import * as path from 'path';
import { Request, Response, NextFunction } from 'express';

// setting process.env from /config/envs/ based on NODE_ENV
const dotenv = require('dotenv-flow');
dotenv.config({
  cwd: path.join(process.cwd(), 'config', 'envs'),
  default_node_env: 'development'
});

import app from './app';

app.use(function(
  err: Error & { status: number },
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({ message: err.message });
});

/**
 * Start Express server.
 */
const server = app.listen(app.get('port'), () => {
  console.log(
    `App is running at http://localhost:${app.get('port')} in ${app.get(
      'env'
    )} mode`
  );
  console.log(`Press CTRL-C to stop\n`);
});

export default server;
