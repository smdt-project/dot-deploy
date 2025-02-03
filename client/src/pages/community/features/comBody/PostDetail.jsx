import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackBtn from "../../../../ui/BackBtn";
import Error from "../../../../ui/Error";
import Loading from "../../../../ui/Loading";
import UserName from "../../../../ui/UserName";
import { detailDataRequest, openSidebar } from "../../communitySlice";
import CommUserName from "../../CommUserName";
import CreateNewBox from "../../CreateNewBox";
import DetailProjectList from "./DetailProjectList";
import PostContent from "./PostContent";

const PostDetail = () => {
	const { id } = useParams();
	const { detailedPost, isDetailing, detailingError, hasChange } = useSelector(
		(state) => state.community
	);
	const post = detailedPost;
	const dispatch = useDispatch();

	useEffect(() => {
		if (hasChange) {
			dispatch(detailDataRequest({ isProject: false, id: id }));
		}
	}, [id, dispatch, hasChange]);

	useEffect(() => {
		dispatch(detailDataRequest({ isProject: false, id: id }));
	}, [id, dispatch]);

	const handleOpening = () => dispatch(openSidebar(true));

	const tryAgain = () =>
		dispatch(detailDataRequest({ isProject: true, id: id }));

	return (
		<div className="flex flex-col gap-7 sd:gap-0 sd:flex-row flex-grow h-[calc(100dvh - 4rem)] p-5 sm:p-7 sd:py-2 overflow-x-hidden overflow-h-scroll small-scroll sd:overflow-hidden ">
			<div className="sm:hidden flex items-center justify-between pt-3">
				<div className="flex items-center gap-3 -mt-[6px]">
					<CommUserName
						handleClick={handleOpening}
						classes={"flex sm:hidden py-1 px-2"}
					/>
					<div className="pt-2">
						<CreateNewBox />
					</div>
				</div>
				<BackBtn />
			</div>
			{post && !isDetailing && !detailingError && (
				<>
					<PostContent post={post} />
					<div className="flex flex-col gap-5 mb-3 rounded-md flex-grow">
						<div className=" flex flex-wrap items-center text-slate-400 gap-2 p-3">
							<span>Other projects by</span>
							<UserName name={"drCode"} avatarUrl={"/dot.svg"} url={""} />
						</div>
						<DetailProjectList
							projects={post.owner.projects}
							ownerId={post.owner._id}
						/>
					</div>
				</>
			)}
			{detailingError && (
				<div className="w-full h-full flex flex-col gap-5 items-center justify-center">
					<BackBtn />
					<Error message={detailingError} tryAgain={tryAgain} />
				</div>
			)}
			{isDetailing && (
				<div className="w-full h-full flex items-center justify-center">
					<Loading message={"Fetching post data..."} />
				</div>
			)}
		</div>
	);
};

export default PostDetail;
