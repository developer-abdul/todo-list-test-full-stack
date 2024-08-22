import React from 'react';

type Props = {
	searchText: string;
	onSearchFilterTasks: (searchText: string) => void;
};
const TodoListSearchComponent = ({
	searchText,
	onSearchFilterTasks,
}: Props) => {
	return (
		<div className="grid items-start gap-5 max-w-sm mx-auto">
			<div className="text-lg text-left items-center mt-5 md:mb-10 flex gap-5">
				<span>Search:</span>
				<span>
					<input
						type="text"
						className="input input-bordered rounded"
						placeholder="Search Task"
						value={searchText}
						onChange={(e) => onSearchFilterTasks(e.target.value)}
					/>
				</span>
			</div>
		</div>
	);
};

export default TodoListSearchComponent;
