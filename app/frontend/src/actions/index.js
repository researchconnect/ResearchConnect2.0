import axios from "axios";
import {
  FETCH_USER,
  DONE_LOADING,
  PARTIAL_LOADING,
  SEARCH,
  FETCH_PROFILE,
  SETUP_USER,
  UPDATE_RESUME
} from "./types";

export const fetchUser = () => async dispatch => {
  dispatch({ type: DONE_LOADING, payload: false });
  try {
    const res = await axios.get("/api/current_user");
    dispatch({ type: FETCH_USER, payload: res.data });
    dispatch({ type: DONE_LOADING, payload: true });
  } catch {
    dispatch({ type: FETCH_USER, payload: false });
    dispatch({ type: DONE_LOADING, payload: true });
  }
};

export const updateUser = (body) => async dispatch => {
    dispatch({ type: PARTIAL_LOADING, payload: false });
    const res = await axios.post('/api/setup/', body);
    dispatch({ type: SETUP_USER, payload: res.data});
    dispatch({ type: PARTIAL_LOADING, payload: true });
};

export const uploadResume = (resume) => async dispatch => {
  dispatch({ type: PARTIAL_LOADING, payload: false });

  const formData = new FormData();
  formData.append("file", resume);

  const res = await axios({
    method: 'post',
    url: '/api/resume/',
    data: formData,
    config: { headers: {'Content-Type': 'multipart/form-data' }}
  });

  console.log(res.data);

  dispatch({
    type: UPDATE_RESUME,
    payload: res.data
  });

  dispatch({type: PARTIAL_LOADING, payload: true });
}


export const fetchPosts = () => async dispatch => {
  const res = await axios.get("/api/research_posts");
  return res.data;
};

export const fetchDepartment = id => async dispatch => {
  const res = await axios.get("/api/department/", {
    params: {
      id: id
    }
  });

  dispatch({
    payload: res.data
  });
};

export const fetchDepartments = () => async dispatch => {
  const res = await axios.get("/api/department");
  return res.data;
};

export const fetchFacultyMember = cruzid => async dispatch => {
  const res = await axios.get("/api/faculty_members/", {
    params: {
      cruzid: cruzid
    }
  });
  dispatch({
    type: FETCH_PROFILE,
    payload: res.data
  });
};

export const fetchStudent = cruzid => async dispatch => {
  const res = await axios.get("/api/students/", {
    params: {
      cruzid: cruzid
    }
  });

  dispatch({
    type: FETCH_PROFILE,
    payload: res.data
  });
};

export const searchPosts = (type, query) => async dispatch => {
  dispatch({ type: PARTIAL_LOADING, payload: false });

  const res = await axios.get("/api/search/", {
    params: {
      type: type,
      query: query
    }
  });

  dispatch({
    type: SEARCH,
    payload: res.data
  });

  dispatch({ type: PARTIAL_LOADING, payload: true });
};
