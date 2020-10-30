export default (config) => (req, res, next) => {
    console.log('Config', config);
    console.log(req.query);
    console.log(req.body);

    next();
};