import { Router } from 'express';

import TraineeController from './Controller';

const TraineeRouter = Router();

TraineeRouter.route('/')
    .get(TraineeController.get)
    .post(TraineeController.post)
    .put(TraineeController.update)
    .delete(TraineeController.delete);

    export default TraineeRouter;