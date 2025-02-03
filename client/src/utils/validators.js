import { isEmpty } from "lodash";

// field validators
export const validateUserName = (username) => {
	if (isEmpty(username)) {
		return "Username is empty";
	} else if (username.trim().length < 3) {
		return "Username should have at least 3 characters";
	} else if (username.trim().length > 20) {
		return "Username should have less than 20 characters";
	}

	return false;
};

// data validators

export const isCurrUserLiked = (likes, userId) => {
	if (likes.includes(userId)) {
		return true;
	} else {
		return false;
	}
};
