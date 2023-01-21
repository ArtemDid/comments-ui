export interface InitialState {
  name: string;
  email: string;
  comments: Array<any>;
  total_count: string;
  isUploaded: boolean;
}

export interface Action {
  payload?: any;
  type: string;
}
