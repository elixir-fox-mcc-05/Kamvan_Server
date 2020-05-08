const Model = require('../models/index.js');
const User = Model.User;
const { verifyToken } = require('../helpers/jsonwebtoken.js');

const authentication = (req, res, next) => {
	try {
		let access_token = req.headers.access_token;
		let decoded = verifyToken(access_token);
		let id = decoded.id;
		let organization = decoded.organization;

		User.findByPk(id)
			.then((data) => {
				if (data) {
					req.signedInUserId = id
					req.signedInUserOrganization = organization;
					next();
				} else {
					throw {
						code: 401,
						type: 'UNAUTHORIZED',
						message: 'Please signin first!'
					};
				}
			})
			.catch((err) => {
				next(err);
			});
	} catch (err) {
		next(err);
	}
};

module.exports = authentication;
