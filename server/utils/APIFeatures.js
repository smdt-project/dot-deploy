class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		// 1A) filtering for just qualities
		let queryObj = { ...this.queryString };
		["fields", "sort", "limit", "page"].forEach((q) => delete queryObj[q]);

		// 1B) filtering for inequalities
		queryObj = JSON.stringify(queryObj).replace(
			/\b(gte|gt|lte|lt)\b/g,
			(match) => `$${match}`
		);

		this.query.find(JSON.parse(queryObj));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query.sort(`${sortBy} -updatedAt`);
		} else {
			this.query.sort("-createdAt");
		}

		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const selectedFields = this.queryString.fields.split(",").join(" ");
			this.query.select(selectedFields);
		} else {
			this.query.select("-__v");
		}

		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 10;
		const skip = (page - 1) * limit;
		this.query.skip(skip).limit(limit);

		// if (this.queryString.page) {
		// 	const numDocs = this.query.countDocuments();
		// 	if (numDocs < skip) {
		// 		this.query.skip(0).limit(10);
		// 		return this;
		// 	}
		// }

		this.query.skip(skip).limit(limit);

		return this;
	}
}

module.exports = APIFeatures;
