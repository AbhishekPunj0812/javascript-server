let users = [
    {
    traineeEmail: 'trainee1@successive.tech',
    reviewerEmail: 'reviewer1@successive.te',
    },
    {
    traineeEmail: 'trainee2@successive.tech',
    reviewerEmail: 'reviewer2@sucssive.tech',
    },
    {
        traineeEmail: 'trainee2@successive.tech',
        reviewerEmail: 'reviewer2@successive.tech',
    }
    ];
    function validateEmail(email){
    let pattern = /^([a-zA-Z0-9\.-]+)@(successive).(tech)$/;
    if(pattern.test(email)){
    return true;
    }
    else{
    return false;
    }
    }
    function validateUsers(users){
    let valid = 0;
    let invalid = 0;
    users.forEach(element => {
    const {traineeEmail, reviewerEmail} = element;
    if(validateEmail(traineeEmail) === true && validateEmail(reviewerEmail) === true){  
    console.log("Valid user :", traineeEmail);
    console.log("Valid user :", reviewerEmail);
    valid=valid+1;
    }else{  
        if(validateEmail(reviewerEmail) !== true){
        console.log("inValid user :", reviewerEmail);
        
        }else{
        console.log("Valid user :", reviewerEmail);
        }
        if(validateEmail(traineeEmail) !== true){
            console.log("inValid user :", traineeEmail);
            
            }else{
            console.log("Valid user :", traineeEmail);
        }
    invalid = invalid+1;
    }

    });
    console.log("Number of valid user",valid);
    console.log("Number of Invalid user", invalid);
    }
    validateUsers(users);