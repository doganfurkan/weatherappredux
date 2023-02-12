import { useEffect } from 'react';
import './App.css';
import Left from './components/Left';
import Right from './components/Right';
import { fetchData, fetchDays, fetchWeek } from "./redux/weatherSlice";
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const latitude = useSelector((state) => state.weather.lat)
  const lon = useSelector((state) => state.weather.lon)

  useEffect(() => {
    dispatch(fetchData("q=istanbul"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWeek({latitude:latitude,lon:lon}));
    dispatch(fetchDays({latitude:latitude,lon:lon}));
  },[dispatch,latitude,lon])

  return (
    <>
      <Left/>
      <Right/>
    </>
  );
}

export default App;
