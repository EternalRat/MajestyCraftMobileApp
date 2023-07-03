import express from 'express';

import auth from './auth';
import vote from './vote';
import voteConfig from './voteConfig';

const app = express();

app.use('/auth', auth);
app.use('/vote', vote);
app.use('/vote-config', voteConfig);

export default app;
