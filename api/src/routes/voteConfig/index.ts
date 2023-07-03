import express from 'express';

import { VoteConfig } from '../../controller/voteConfig';

const app = express();

app.get('/', VoteConfig.voteConfig);

export default app;
