import { useSelector } from "react-redux";


export default function Week() {
  const week = useSelector((state) => state.weather.week);
  const loading = useSelector((state) => state.weather.loading);
  const gunle = (dt) => {
    let gun = new Date(dt);
    let cevap = gun.toLocaleString("en", {weekday: 'long'});
    return cevap;
  }
  return (
    <>
      <div className="heading">Daily Forecast for Next Week</div>
      <div id="weekly">
        {week.map((item, index) => {
          return (
            <div className="weekly" key={index}>
              <div className="day">
                <div className={loading ? "loading dayName" : "dayName"}>{gunle(item.dt * 1000)}</div>
              </div>
              <div className="derece">
                <div className={loading ? "loading drc" : "drc"}>
                  {Math.round(item.temp.day)}°C
                </div>
              </div>
              <div className="durum">
                <div className={loading ? "loading drm" : "drm"}>{item.weather[0].description}</div>
              </div>
              <div className={loading ? "loading img" : "img"}>
                <img src={`/icons/${item.weather[0].icon}.webp`} alt="weather" />
              </div>
            </div>
          );
        })}
      </div>

      <div id="p">Have a great day y’all! No matter how the weather is.</div>
    </>
  );
}
