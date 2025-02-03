import { supportedLng } from "./supportedLng";

export const copyTextToClipboard = async (text, setCopied) => {
	try {
		await navigator.clipboard.writeText(text);
		setCopied(true);
	} catch (err) {
		setCopied(false);
	}
};

export const calcDayDifference = (laterDateMs, earlierDateMs) => {
	const diffInMs = laterDateMs - earlierDateMs;
	const minDiff = Math.floor(diffInMs / (60 * 1000));
	const hrDiff = Math.floor(diffInMs / (60 * 60 * 1000));
	const daysDiff = Math.floor(diffInMs / (24 * 60 * 60 * 1000));

	if (daysDiff === 0) {
		if (hrDiff === 0) {
			if (minDiff === 0) {
				return "just now";
			} else if (minDiff === 1) {
				return "a minute ago";
			} else {
				return minDiff + " mins ago";
			}
		} else {
			if (hrDiff === 1) {
				return "an hour ago";
			} else {
				return hrDiff + " hrs ago";
			}
		}
	} else if (daysDiff === 1) {
		return "1 day ago";
	} else if (daysDiff > 0) {
		return daysDiff + " days ago";
	} else {
		return "";
	}
};

export const lastUpdate = (createdAt, updatedAt) => {
	const dayDiff = calcDayDifference(Date.now(), Date.parse(updatedAt));
	return Date.parse(createdAt) === Date.parse(updatedAt)
		? `created ${dayDiff}`
		: `edited ${dayDiff}`;
};

// just to retrieve lng info
const languages = supportedLng;
export const getLngInfo = (name) => {
	return languages.find((lng) => lng.lngName === name);
};
