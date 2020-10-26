import { validateEmail } from './helper';
    export function validateUsers(users) {
    let valid = 0;
    let invalid = 0;
    users.forEach((element: { traineeEmail: any; reviewerEmail: any; }) => {
    const {traineeEmail, reviewerEmail} = element;
    if (validateEmail(traineeEmail) === true && validateEmail(reviewerEmail) === true) {
    console.log('Valid user :', traineeEmail);
    console.log('Valid user :', reviewerEmail);
    valid = valid + 1;
    } else {
        if (validateEmail(reviewerEmail) !== true) {
        console.log('inValid user :', reviewerEmail);
        } else {
        console.log('Valid user :', reviewerEmail);
        }
        if (validateEmail(traineeEmail) !== true) {
            console.log('inValid user :', traineeEmail);
            } else {
            console.log('Valid user :', traineeEmail);
        }
    invalid = invalid + 1;
    }

    });
    console.log('Number of valid user', valid);
    console.log('Number of Invalid user', invalid);
    }
    // validateUsers(users);