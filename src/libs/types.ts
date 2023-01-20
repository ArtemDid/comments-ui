export interface InitialState {
  name: string;
  email: string;
  comments: Array<any>;
  isUploaded: boolean;
}

export interface Action {
  payload?: any;
  type: string;
}
