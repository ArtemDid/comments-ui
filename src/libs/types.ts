export interface InitialState {
  name: string;
  email: string;
  isUploaded: boolean;
}

export interface Action {
  payload?: any;
  type: string;
}
