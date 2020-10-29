class TraineeController {
    static instance: TraineeController;
    static getInstance() {
        if ( TraineeController.instance ) {
            return TraineeController.instance;
        }
        TraineeController.instance = new TraineeController();
    }
    get( req, res, next) {
        try {
            console.log ('Inside get method of trainee controller');
            res.send({
                message: 'Trainees Fetched Successfully',
                data: [
                    {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
                ]
            });
        } catch ( err ) {
            console.log('Inside err', err);
}
    }

    post( req, res, next) {
        try {
            console.log ('Inside post method of trainee controller');
            res.send({
                message: 'Trainees Posted Successfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch ( err ) {
            console.log('Inside err', err);
}
    }

    update( req, res, next) {
        try {
            console.log ('Inside update method of trainee controller');
            res.send({
                message: 'Trainees Updated Successfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch ( err ) {
            console.log('Inside err', err);
}
    }

    delete( req, res, next) {
        try {
            console.log ('Inside delete method of trainee controller');
            res.send({
                message: 'Trainees Deleted Successfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch ( err ) {
            console.log('Inside err', err);
}
    }
}
export default new TraineeController();