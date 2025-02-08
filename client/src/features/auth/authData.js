import Cookies from "js-cookie";

export const storeUserData = (user) => {
	const userData = user.data;
	const jwt = user.token;
	const expiration = Date.now() + 24 * 60 * 60 * 1000;
	const data = {
		loginAt: Date.now(),
		expiry: expiration,
		name: userData.name,
		userId: userData._id,
		email: userData.email,
		bio: userData.bio,
		avatarUrl: userData.avatarUrl,
	};

	Cookies.set("jwt", jwt, { expires: 1000 * 60 * 60 * 24 });

	localStorage.setItem("userData", JSON.stringify(data));
};

export const getUserData = (isToken = false) => {
	const storedData = JSON.parse(localStorage.getItem("userData"));
	const token = Cookies.get("jwt");

	if (storedData && token && storedData.expiry > Date.now()) {
		if (isToken) {
			return token;
		} else {
			return storedData;
		}
	}

	localStorage.removeItem("userData");
	return null;
};

export const removeUserData = () => {
	localStorage.removeItem("userData");
	document.location.reload();
};
