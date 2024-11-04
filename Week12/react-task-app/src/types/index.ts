export interface ITask{
    taskId: string;
    taskName: string;
    taskDescription: string;
    taskOwner : string
}

export interface ILogItem {
    logId: string;
    logAuthor: string;
    logMessage: string;
    logTimestamp: string;
}