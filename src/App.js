import React, { useReducer } from "react";
import "./App.css";
import "./bootstrap-4.0.0-dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { dataBase as users } from "./mock";
import { reducer } from "./reducer/reduce";

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    data: users,
    name: "",
    lastName: "",
    search: "",
    select: null,
  });
  return (
    <div className="App">
      <div className="container">
        <select
          onChange={(e) =>
            dispatch({ type: "SELECTED", payload: e.target.value })
          }
          class="form-select"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="lastName">Last Name</option>
          <option value="status">Status</option>
        </select>
        <input
          onChange={(e) =>
            dispatch({ type: "CHANGED", payload: e.target.value })
          }
          type="text"
          placeholder="Search..."
          className="form-control"
        />
      </div>
      <div className="container">
        <input
          onChange={(e) =>
            dispatch({
              type: "GET_VALUE",
              payload: { inputName: e.target.name, value: e.target.value },
            })
          }
          name="name"
          type="text"
          placeholder="Enter user name"
          className="form-control"
        />
        <input
          onChange={(e) =>
            dispatch({
              type: "GET_VALUE",
              payload: { inputName: e.target.name, value: e.target.value },
            })
          }
          name="lastName"
          type="text"
          placeholder="Enter user last name"
          className="form-control"
        />
        <input
          onChange={(e) =>
            dispatch({
              type: "GET_VALUE",
              payload: { inputName: e.target.name, value: e.target.value },
            })
          }
          name="status"
          type="text"
          placeholder="Enter user status"
          className="form-control"
        />
        <button
          onClick={() => dispatch({ type: "ON_CREATE" })}
          className="btn btn-success"
        >
          Create
        </button>
      </div>
      <div className="container">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.data.length > 0 ? (
              state.data.map((value) => {
                return (
                  <tr key={value.id}>
                    <td>{value.id}</td>
                    <td>
                      {state.select === value.id ? (
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "GET_VALUE",
                              payload: {
                                inputName: e.target.name,
                                value: e.target.value,
                              },
                            })
                          }
                          name="name"
                          type="text"
                          className="form-control"
                          value={state.name}
                        />
                      ) : (
                        value.name
                      )}
                    </td>
                    <td>
                      {state.select === value.id ? (
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "GET_VALUE",
                              payload: {
                                inputName: e.target.name,
                                value: e.target.value,
                              },
                            })
                          }
                          name="lastName"
                          type="text"
                          className="form-control"
                          value={state.lastName}
                        />
                      ) : (
                        value.lastName
                      )}
                    </td>
                    <td>
                      {state.select === value.id ? (
                        <input
                          onChange={(e) =>
                            dispatch({
                              type: "GET_VALUE",
                              payload: {
                                inputName: e.target.name,
                                value: e.target.value,
                              },
                            })
                          }
                          name="status"
                          type="text"
                          className="form-control"
                          value={state.status}
                        />
                      ) : (
                        value.status
                      )}
                    </td>
                    <td>
                      <Button
                        onClick={() =>
                          dispatch({
                            type: "REMOVE_USER",
                            payload: { ids: value.id },
                          })
                        }
                        className="btn btn-danger"
                      >
                        Delete
                      </Button>
                      &nbsp;&nbsp;
                      {state.select === value.id ? (
                        <button
                          onClick={() => dispatch({ type: "ON_SAVE" })}
                          className="btn btn-primary"
                        >
                          Save
                        </button>
                      ) : (
                        <Button
                          onClick={(e) =>
                            dispatch({
                              type: "ON_UPDATE",
                              payload: { allData: value },
                            })
                          }
                          className="btn btn-warning"
                        >
                          Edit
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <th colSpan={5}>
                  <h1>No Data Available...</h1>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
