export interface PageTitleProps {
    title: string
}

export interface TaskProps {
    id?: number;
    title: string;
    description: string;
    created_at?: string;
}

export interface TaskTableProps {
    tasks: TaskProps[];
    onView: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface HeaderProps {
    onSearch: (query: string) => void;
    onAddTask: () => void;
    onSort: () => void;
}

export interface AddTaskProps {
    open: boolean;
    onClose: () => void;
    id?: number | any;
}

export interface DeleteTaskProps extends AddTaskProps {
    taskId: number;
  }

export interface CreateTaskAPIProps {
    statusCode: number,
    message: string,
    task: TaskProps
}