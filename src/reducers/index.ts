// TODO: could eventually refactor all actions
// so they're dispatched via action creator functions instead of
// manually composing actions

export interface RootReducerAction {
  type: string;
  data?: any;
};
