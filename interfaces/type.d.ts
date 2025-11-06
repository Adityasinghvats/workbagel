export interface Task {
    id: string;
    title: string;
    description: string;
    status: 'Open' | 'In Progress' | 'Closed';
    priority?: 'High' | 'Medium' | 'Low';
    dueDate?: string;
    assignee?: string;
}