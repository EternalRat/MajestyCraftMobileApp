import express from 'express';

import { AuthController } from '../../controller/auth';

const app = express();

app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.post('/logout', AuthController.logout);

export default app;
