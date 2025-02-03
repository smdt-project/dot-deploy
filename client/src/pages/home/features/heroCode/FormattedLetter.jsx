const isNumeric = (char) => {
	return !isNaN(parseInt(char));
};
const isSpecialChar = (char) => {
	return /^[^a-zA-Z0-9]$/.test(char);
};

const FormattedLetter = ({ letter }) => {
	if (isNumeric(letter)) {
		return <span className="text-n-4">{letter}</span>;
	}
	if (isSpecialChar(letter)) {
		return <span className="text-n-1">{letter}</span>;
	} else {
		return <span className="text-color-3">{letter}</span>;
	}
};

export default FormattedLetter;
