import React, { RefObject } from 'react';

type Props = {
	taskInputRef: RefObject<HTMLInputElement>;
	onTaskCreateNew: () => void;
};
const TodoListAddComponent = ({ taskInputRef, onTaskCreateNew }: Props) => {
	return (
		<div className="todo-input my-4">
			<div className="flex gap-4 justify-center ">
				<div className="grid w-full max-w-80 text-center">
					<input
						ref={taskInputRef}
						type="text"
						id="todo-input"
						placeholder="Enter Task"
						className="input input-bordered border-2 rounded max-w-80 w-full p-2"
					/>
				</div>
				<button
					className="btn bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
					onClick={onTaskCreateNew}
				>
					Add Task
				</button>
			</div>
		</div>
	);
};

export default TodoListAddComponent;
