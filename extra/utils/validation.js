let users = [
    {
    traineeEmail: 'trainee1@successive.tech',
    reviewerEmail: 'reviewer1@successive.tech',
    },
    {
    traineeEmail: 'trainee2@successive.tech',
    reviewerEmail: 'reviewer2@succesive1.tech',
    }
    ];
    
    function validateEmail(email){
    let pattern = /^([a-zA-Z0-9\.-]+)@(successive).(tech)$/;
    if(pattern.test(email))
    {
        return true;
    }
    else
    {
        return false;
    }
    }
    
    function validateUsers(users)
    {
    let valid = 0;
    let invalid = 0;
    users.forEach(element => {
    if(validateEmail(element.traineeEmail) === true){
    console.log("Valid user :", element.traineeEmail);
    valid=valid+1;
    }else{
    console.log("InValid user :", element.traineeEmail);
    invalid = invalid+1;
    }
    if(validateEmail(element.reviewerEmail) === true){
    console.log("Valid user :", element.reviewerEmail);
    valid=valid+1;
    }else{
    console.log("InValid user :", element.reviewerEmail);
    invalid = invalid+1;
    }
    });
    console.log("Number of valid user",valid);
    console.log("Number of Invalid user", invalid);
    }
    
    validateUsers(users);
    