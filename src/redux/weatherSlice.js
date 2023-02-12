import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchData = createAsyncThunk("weather/getData", async (gelen) => {
  const res = await axios(
    `https://api.openweathermap.org/data/2.5/weather?${gelen}&units=metric&appid=83bbbf353f02784534df80da5f9051bf`
  );
  return res.data;
});

 export const fetchWeek = createAsyncThunk(
  "weather/getWeek",
  async ({latitude, lon}) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${lon}&units=metric&appid=83bbbf353f02784534df80da5f9051bf`
    );
    return res.data;
  }
);  


export const fetchDays = createAsyncThunk(
  "weather/getDays",
  async ({latitude, lon}) => {
    const res = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=83bbbf353f02784534df80da5f9051bf`
    );
    return res.data;
  }
);  



export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: "Istanbul",
    lat: 5,
    lon: 5,
    daily: { temp: 25, min: 23, max: 27, desc: "açık", feels: 26, icon: "04n" },
    hourly: [
      {
        dt_txt: " 18:00:00",
        main: { temp: 25 },
        wind: { speed: 15 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 21:00:00",
        main: { temp: 20 },
        wind: { speed: 20 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 00:00:00",
        main: { temp: 15 },
        wind: { speed: 22 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 03:00:00",
        main: { temp: 25 },
        wind: { speed: 15 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 06:00:00",
        main: { temp: 20 },
        wind: { speed: 20 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 09:00:00",
        main: { temp: 15 },
        wind: { speed: 22 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 12:00:00",
        main: { temp: 25 },
        wind: { speed: 15 },
        weather:[{icon:"04d"}]
      },
      {
        dt_txt: " 15:00:00",
        main: { temp: 20 },
        wind: { speed: 20 },
        weather:[{icon:"04d"}]
      },
    ],
    week: [
      {
        dt: "Pazartesi",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
      {
        dt: "Salı",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
      {
        dt: "Pazartesi",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
      {
        dt: "Pazartesi",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
      {
        dt: "Pazartesi",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
      {
        dt: "Pazartesi",
        temp: {day:25},
        weather:[{description:"Clouds",icon:"10d"}]
      },
    ],
    loading: false,
  },
  reducers: {
    changeType: (state, action) => {
      state.type = action.payload;
    },
    changeParas: (state, action) => {
      state.paras = action.payload;
    },
  },
  extraReducers: {
    [fetchData.fulfilled]: (state, action) => {
      state.loading = false;
      state.city = `${action.payload.name}, ${action.payload.sys.country}`;
      state.daily.temp = action.payload.main.temp;
      state.daily.min = action.payload.main.temp_min;
      state.daily.max = action.payload.main.temp_max;
      state.daily.feels = action.payload.main.feels_like;
      state.daily.desc = action.payload.weather[0].description;
      state.daily.icon = action.payload.weather[0].icon;
      state.lat = action.payload.coord.lat;
      state.lon = action.payload.coord.lon;
    },
    [fetchData.pending]: (state) => {
      state.loading = true;
    },
    [fetchWeek.fulfilled]: (state, action) => {
      state.loading = false;
      let saatlik = [];
      for(let i = 0;i<8;i++){
        saatlik.push(action.payload.list[i])
      }
      state.hourly = saatlik;
    },
    [fetchWeek.pending]: (state) => {
      state.loading = true;
    },
    [fetchDays.fulfilled]: (state, action) => {
      state.loading = false;
      let need = action.payload.daily.slice(1,7)
      state.week = need;
    },
    [fetchDays.pending]: (state) => {
      state.loading = true;
    },
    [fetchDays.rejected]: (error) => {
      console.log(error);
    }
  },
});

//export const { increase, changeType, changeParas } = weatherSlice.actions;
export default weatherSlice.reducer;
