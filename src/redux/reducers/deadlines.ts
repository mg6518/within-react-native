import { List } from "immutable";
import Deadline from "../../models/Deadline";
import { Actions, DeadlineAction, TodoAction } from "../actionTypes";

const deadlineReducer = (
  state: Deadline[] = [],
  action: DeadlineAction | TodoAction
) => {
  switch (action.type) {
    case Actions.DeadlineAdd:
      return List(state).push(action.payload).toArray();
    case Actions.DeadlineRemove:
      return state.filter((item) => item.id !== action.payload.id);
    case Actions.DeadlineUpdate:
      return List(state)
        .update(
          state.findIndex((item) => item.id === action.payload.id),
          (proj) => action.payload
        )
        .toArray();
    // case Actions.DeadlineComplete:
    //     return
    default:
      console.log(`Ignored deadline action: ${action.type}`);
      return state;
  }
};

export default deadlineReducer;
