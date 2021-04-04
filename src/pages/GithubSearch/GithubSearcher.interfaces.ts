interface IRepository {
  id: number;
  fullName: string;
  description: string;
  language: string;
  stargazersCount: number;
  openIssues: number;
  forks: number;
  htmlUrl: string;
}
interface IUser {
  id: number;
  login: string;
  avatarUrl: string;
  htmlUrl: string;
  url: string
}

interface IGenericResults {
  [k: string]: {
    items: IUser[] | IRepository[];
    page: number;
  }
}
interface IPayload {
  isLoading: boolean;
  page: number;
  appendToState: boolean;
  errorMessage?: string;
  query: string;
  items: IUser[] | IRepository[];
}

interface IAction {
  payload: IPayload;
  type: string;
}

export type {
  IUser,
  IRepository,
  IAction,
  IGenericResults
}