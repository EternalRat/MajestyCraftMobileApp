import express from 'express';

import { AuthController } from '../../controller/auth';
import { Middleware } from '../../controller/middleware';

const app = express();

app.post('/login', AuthController.login);
app.post('/logout', AuthController.logout);
app.get('/', Middleware.auth, AuthController.health);

export default app;
