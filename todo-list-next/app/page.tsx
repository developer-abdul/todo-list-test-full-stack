'use client';
import TodoListAddComponent from '@/components/TodoListAddComponent';
import TodoListSearchComponent from '@/components/TodoListSearchComponent';
import TodoListTableComponent from '@/components/TodoListTableComponent';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
	const taskInputRef = useRef<HTMLInputElement>(null);
	const [searchText, setSearchText] = useState('');
	const [tasks, setTasks] = useState<ITask[]>([]);

	const [sucMsg, setSucMsg] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const getTaskList = async () => {
		const taskApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task`;
		const result: ITask[] = await fetch(`${taskApiUrl}`).then((res) =>
			res.json()
		);

		return result;
	};

	useEffect(() => {
		const setTaskList = async () => {
			const result = await getTaskList();
			setTasks(result);
			setIsLoading(false);
		};
		setTaskList();
	}, []);

	const handleSearchFilterTasks = async (searchText: string) => {
		setSearchText(searchText);
		const taskList = await getTaskList();
		if (!searchText) {
			setTasks(taskList);
			return;
		}

		// Filter the tasks by search text
		const filteredTasks = taskList.filter((tasks) => {
			return tasks?.title.toLowerCase().startsWith(searchText.toLowerCase());
		});

		setTasks(filteredTasks);
	};

	const handleOnTaskStatusUpdate = async (
		taskId: number,
		newStatus: boolean
	) => {
		const taskApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`;
		const data = {
			status: newStatus,
		};
		const result = await fetch(taskApiUrl, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				handleSearchFilterTasks(searchText);
			});
	};

	const handleOnTaskCreateNew = async () => {
		reset();
		const taskApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/`;
		const title = taskInputRef.current?.value;
		const data = {
			title,
		};

		if (title === '') {
			setErrMsg('Please enter valid task title');
			return;
		}
		const result = await fetch(taskApiUrl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setErrMsg(data.message);
				} else {
					setSucMsg('Task added successfully');
					taskInputRef.current!.value = '';
					taskInputRef.current?.focus()
					handleSearchFilterTasks(searchText);
				}
			});
	};

	const handleOnTaskDelete = async (taskId: number) => {
		const taskApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}`;
		const result = await fetch(taskApiUrl, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					setErrMsg(data.error);
				} else {
					setSucMsg('Task deleted successfully');
					handleSearchFilterTasks(searchText);
				}
			});
	};

	const reset = () => {
		setErrMsg('');
		setSucMsg('');
	};

	return (
		<main className="flex min-h-screen flex-col items-center p-10">
			<div className="w-full p-4 max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-center">Todo List Home Page</h1>
				<div className="w-full text-center">
					{sucMsg && <div className="text-success py-4">{sucMsg}</div>}
					{errMsg && <div className="text-error py-4">{errMsg}</div>}
				</div>

				<TodoListAddComponent
					taskInputRef={taskInputRef}
					onTaskCreateNew={handleOnTaskCreateNew}
				/>

				<TodoListSearchComponent
					searchText={searchText}
					onSearchFilterTasks={handleSearchFilterTasks}
				/>

				<TodoListTableComponent
					tasks={tasks}
					onTaskStatusUpdate={handleOnTaskStatusUpdate}
					onTaskDelete={handleOnTaskDelete}
				/>
			</div>
		</main>
	);
}
