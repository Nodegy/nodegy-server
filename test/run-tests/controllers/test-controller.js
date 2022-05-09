// access tests:
exports.allAccess = (req, res) => {
    res.status(200).send('Public Content.');
};

exports.userBoard = (req, res) => {
    res.status(200).send('User Content.');
};

exports.adminBoard = (req, res) => {
    res.status(200).send('Admin Content.');
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send('Moderator Content.');
};

exports.testFunc = (req, res) => {
    let message = '!! TEST !!';
    console.log(message);
    res.status(200).send({ message: message });
};