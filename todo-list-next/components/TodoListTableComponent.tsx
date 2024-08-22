import React from 'react';

type Props = {
	tasks: ITask[];
	onTaskStatusUpdate: (taskId: number, newStatus: boolean) => void;
	onTaskDelete: (taskId: number) => void;
};
const TodoListTableComponent = ({
	tasks,
	onTaskStatusUpdate,
	onTaskDelete,
}: Props) => {
	return (
		<div className="todo-list w-full max-w-lg mx-auto">
			<table className="w-full text-left">
				<thead>
					<tr>
						<th className="w-20">&nbsp;</th>
						<th>Task Name</th>
						<th className="w-32">Status</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					{tasks &&
						tasks.length > 0 &&
						tasks.map((task) => (
							<tr key={task.id}>
								<td>
									<input
										type="checkbox"
										className="checkbox"
										checked={task.status}
										onChange={(e) => {
											onTaskStatusUpdate(task.id, e.target.checked);
										}}
									/>
								</td>
								<td>{task.title}</td>
								<td>{task.status ? 'Done' : 'Not Done'}</td>
								<td className="flex gap-2">
									<button
										className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded"
										onClick={() => onTaskDelete(task.id)}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
											/>
										</svg>
									</button>
								</td>
							</tr>
						))}

					{!tasks ||
						(tasks.length === 0 && (
							<tr>
								<td colSpan={4} className="text-center font-bold py-4">
									No tasks found
								</td>
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
};

export default TodoListTableComponent;
