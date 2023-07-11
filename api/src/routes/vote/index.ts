import express from 'express';

import { VoteController } from '../../controller/vote';

const app = express();

app.post('/', VoteController.vote);
app.post('/stock', VoteController.stock);
app.get('/', VoteController.votes);
app.get('/has', VoteController.hasVote);
app.get('/get', VoteController.getVote);

export default app;
