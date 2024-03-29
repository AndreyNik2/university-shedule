import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IDataGroups } from "../../models/IGroups";
import { IDataWeeks } from "../../models/IWeeks";
import { ICurrent } from "../../models/ICurrent";


axios.defaults.baseURL = "https://schedule.polytech.cv.ua/api";

const setAuthHeader = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};



export const fetchGroups = createAsyncThunk(
  "initial/fetchGroups",
  async (_, thunkAPI) => {
    // axios.defaults.headers.common["no-time-limit"] = true; 
    try {
      const { data } = await axios.get<IDataGroups>("/schedule/groups");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        "Sorry something went wrong. Failed to load groups"
      );
    }
  }
);

export const fetchWeeks = createAsyncThunk(
  "initial/fetchWeeks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get<IDataWeeks>("/schedule/weeks");
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        "Sorry something went wrong. Failed to load weeks"
      );
    }
  }
);

export const getCurrentDay = createAsyncThunk(
  "initial/getCurrentDay",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get<ICurrent>("/schedule/time/current");
      return data;
    } catch (e) {
      return rejectWithValue(
        "Sorry something went wrong. Failed to load weeks"
      );
    }
  }
);


export const getShedule = async (group: string, week: string) => {
  try {
    const { data } = await axios.get("/schedule/lessons", {
      params: { group: group, week: week },
    });
    return data;
  } catch (error: unknown) {
    return;
  }
};

export const fetchTeachers = createAsyncThunk(
  "initial/fetchTeachers",
  async (_, {rejectWithValue, getState}) => {
    const state: any = getState();
    const persistedAccessToken = state.auth.user.access_token;
    if (!persistedAccessToken) {
      return rejectWithValue("Помилка авторизації");
    }
    setAuthHeader(persistedAccessToken);
    // axios.defaults.headers.common["no-time-limit"] = true; 
    try {
      const { data } = await axios.get("/teacher/list");
      return data;
    } catch (e) {
      return rejectWithValue(
        "Sorry something went wrong. Failed to load teachers list"
      );
    }
  }
);

