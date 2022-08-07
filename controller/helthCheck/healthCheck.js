const healthCheckController = {
	healthCheck(req, res, next) {
		const health = {
			uptime: process.uptime(),
			responsetime: process.hrtime(),
			message: "ok",
			timestamp: Date.now(),
		};

		try {
			res.json(health);
		} catch (err) {
			health.message = err;
			res.status(503).send();
		}
	},
};

export default healthCheckController;
