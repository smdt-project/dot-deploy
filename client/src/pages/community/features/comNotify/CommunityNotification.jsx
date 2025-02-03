import NewSupport from "./NewSupport";
import Popular from "./Popular";

const CommunityNotification = ({ classes }) => {
	return (
		<div className={`${classes} `}>
			<span className="text-slate-400 flex sd:hidden">dotcode says:</span>
			<NewSupport />
			<Popular />
		</div>
	);
};

export default CommunityNotification;
