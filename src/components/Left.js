import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CiSearch,
  CiLocationOn,
  CiDark,
  CiLink,
  CiLinkedin,
  CiSun,
  CiHeart,
} from "react-icons/ci";
import { CgMenuRight, CgClose } from "react-icons/cg";
import { VscGithubAlt } from "react-icons/vsc";
import { fetchData } from "../redux/weatherSlice";

export default function Left() {
  const [menuOpen, setMenuopen] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const city = useSelector((state) => state.weather.city);
  const daily = useSelector((state) => state.weather.daily);
  const loading = useSelector((state) => state.weather.loading);
  const dispatch = useDispatch();
  const locate = (pos) => {
    let icerik = `lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`;
    dispatch(fetchData(icerik));
  };

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission Denied.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        console.log("Don't know");
        break;
    }
  };

  return (
    <div id="left">
      <nav>
        <div id="searchBox">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              dispatch(fetchData(`q=${searchTerm}`));
              setSearchTerm("");
            }}
          >
            <input
              type="text"
              id="searchInput"
              name="cityName"
              placeholder="Enter City Name"
              aria-label="Enter City Name"
              required
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
            <button aria-label="Search Button" id="searchButton">
              <CiSearch />
            </button>
            <span
              id="locateButton"
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(locate, showError);
                } else {
                  alert("Geolocation is not supported by this browser.");
                }
              }}
            >
              <CiLocationOn />
            </span>
          </form>
        </div>
        <button
          id="openMenu"
          aria-label="Open Menu"
          onClick={() => {
            setMenuopen("active");
          }}
        >
          <CgMenuRight />
        </button>
      </nav>

      <section id="today">
        <div id="city">
          <div id="cityname" className={loading ? "loading" : ""}>
            {city}
          </div>
        </div>
        <div id="image">
          <div className={loading ? "loading" : ""}>
            <img src={`/icons/${daily.icon}.webp`} alt="img" />
          </div>
        </div>
        <div id="stats">
          <div id="degrees" className={loading ? "loading" : ""}>
            {Math.round(daily.temp)}°C
          </div>
          <div id="minmax" className={loading ? "loading" : ""}>
            {Math.round(daily.min)}°C / {Math.round(daily.max)}°C
          </div>
          <div id="desc" className={loading ? "loading" : ""}>
            {daily.desc}
          </div>
          <div id="feels" className={loading ? "loading" : ""}>
            Feels Like: {daily.feels}°C
          </div>
        </div>
      </section>

      <div id="menu" className={menuOpen}>
        <div id="menuIc">
          <div
            className="menuItem themeButton"
            onClick={() => {
              document.body.classList.toggle("dark");
            }}
          >
            <button aria-label="Change to dark theme" className="themeButton darkmode">
              <CiDark />
            </button>
            <b className="darkmode">Dark Mode</b>
            <button aria-label="Change to light theme" className="themeButton lightmode">
              <CiSun />
            </button>
            <b className="lightmode">Light Mode</b>
          </div>
          <div className="menuItem hidden">
            <button aria-label="Link to my website">
              <CiLink />
            </button>
            My Website
          </div>
          <a href="https://github.com/doganfurkan" target="_blank" rel="noreferrer" className="menuItem">
            <button aria-label="Link to my github account">
              <VscGithubAlt />
            </button>
            My Github
          </a>
          <a href="https://www.linkedin.com/in/furkan-doğan/" target="_blank" rel="noreferrer" className="menuItem">
            {" "}
            <button aria-label="Link to my linkedin account">
              <CiLinkedin />
            </button>
            My Linkedin
          </a>
          <div id="madeBy">
            Made with{" "}
            <span id="love">
              <CiHeart />
            </span>{" "}
            by Furkan Doğan.
          </div>
          <button aria-label="Close Menu"
            id="closeMenu"
            onClick={() => {
              setMenuopen("");
            }}
          >
            <CgClose />
          </button>
        </div>
      </div>
    </div>
  );
}
