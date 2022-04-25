import { useMainContext } from "../context/MainContext";


const Header = () => {
    const { setThemeSun } = useMainContext()
    return (
        <header>
            <div className="logo-wrapper">
                <img src="/logo.png" className="logo" />
                <h1>BananaCount</h1>
            </div>
            <div className="theme-switch">
                <div className="sun-mood">
                    <div className="round-btn-sun" onClick={(e) => { setThemeSun(true) }} />
                    <div className="mood-text">Sun Mood</div>
                </div>
                <div className="moon-mood">
                    <div className="round-btn-moon" onClick={(e) => { setThemeSun(false) }} />
                    <div className="mood-text">Moon Mood</div>
                </div>
            </div>
        </header>
    )
}

export default Header