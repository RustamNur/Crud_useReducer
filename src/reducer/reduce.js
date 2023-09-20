import { dataBase as users } from "../mock";

export const reducer = (state, action) => {
  switch (action.type) {
    //---Handling multiple inputs----
    case "GET_VALUE":
      return { ...state, [action.payload.inputName]: action.payload.value };

    //---Delete data----
    case "REMOVE_USER":
      const filtered = state.data.filter(
        (value) => value.id !== action.payload.ids
      );
      return { ...state, data: filtered };

    //---Search data----
    case "CHANGED":
      const searchedData = users.filter((value) =>
        `${value[state.search]}`
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      return { ...state, data: searchedData };

    //---Search by category----
    case "SELECTED":
      return { ...state, search: action.payload };

    //---Create a new user----
    case "ON_CREATE":
      const newUser = [
        ...state.data,
        {
          id: state.data.length + 1,
          name: state.name,
          lastName: state.lastName,
          status: state.status,
        },
      ];
      return { ...state, data: newUser };

    //---Update current data----
    case "ON_UPDATE":
          return {
              ...state, select: action.payload.allData.id,
              name: action.payload.allData.name,
              lastName: action.payload.allData.lastName,
              status:action.payload.allData.status
          };
    //---save updated data----
      case "ON_SAVE": 
          const updateUser = state.data.map(value => value.id === state.select ? { ...value, name: state.name, lastName: state.lastName, status: state.status } : value)
          return {...state,data:updateUser,select:null}

    default:
      return state;
  }
};
