import { useSelector } from "react-redux";

export default function Hourly() {
  const loading = useSelector((state) => state.weather.loading);
  const hourly = useSelector((state) => state.weather.hourly);

  return (
    <div id="menunother">
      <div className="heading">Today's Hourly Forecast</div>
      <div id="other">
        <section id="hourly">
          <div id="hourlyForecast">
            {hourly.map((item, index) => {
              return (
                <div className="hourly" key={index}>
                  <div className={loading ? "loading hour" : "hour"}>
                    {item.dt_txt.substr(-8, 5)}
                  </div>
                  <div className={loading ? "loading image" : "image"}>
                    <img
                      src={`/icons/${item.weather[0].icon}.png`}
                      alt="yağış"
                    />
                  </div>
                  <div className={loading ? "loading degrees" : "degrees"}>
                    {Math.round(item.main.temp)}°C
                  </div>
                  <div className={loading ? "loading wind" : "wind"}>
                    <img
                      src="wind.png"
                      alt="wind"
                      style={{ transform: `rotate(${item.wind.deg}deg)` }}
                    /> 
                    {item.wind.speed} m/s
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
