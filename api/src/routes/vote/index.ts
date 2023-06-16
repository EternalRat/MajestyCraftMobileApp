import express from 'express';

import { VoteController } from '../../controller/vote';

const app = express();

app.post('/', VoteController.vote);

export default app;
