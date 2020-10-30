class TraineeController {
    instance: TraineeController;
    static instance: any;
  static getInstance() {
      if (TraineeController.instance) {
        return TraineeController.instance;
      }
    TraineeController.instance = new TraineeController();
      return TraineeController.instance;
    }

    get(req, res, next) {
      try {
        console.log('Inside get method of Trainee Controller');
      res.send({
          message: 'Trainees fetched successfully',
          data: [
            {
              name: 'Trainee1',
              address: 'Noida'
            }
          ]
        });
      } catch (err) {
        console.log('Inside err', err);
        next({
          error: 'Error Occured in fetching user',
          code: 500,
          message: err
        });
      }
    }

    create(req, res, next) {
      try {
        console.log('Inside post method of Trainee Controller');
        res.send({
          message: 'Trainees created successfully',
          data: [
            {
              name: 'Trainee1',
              address: 'Noida'
            }
          ]
        });
      } catch (err) {
        console.log('Inside err', err);
      }
    }

    update(req, res, next) {
      try {
        console.log('Inside update method of Trainee Controller');

      res.send({
          message: 'Trainees updated successfully',
          data: [
            {
              name: 'Trainee1',
              address: 'Noida'
            }
          ]
        });
      } catch (err) {
        console.log('Inside err', err);
      }
    }

   delete(req , res , next) {
      try {
        console.log('Inside delete method of Trainee Controller');
        res.send({
          message: 'Trainees deleted successfully',
          data: [
            {
              name: 'Trainee1',
              address: 'Noida'
            }
          ]
        });
      } catch (err) {
        console.log('Inside err', err);
      }
    }

  }

  export default  new TraineeController();