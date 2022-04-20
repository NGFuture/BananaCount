const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="main-footer">

            <div> Copyright &copy; {year} | &nbsp; <a href="https://github.com/NGFuture/BananaCount">GitHub</a> </div>

            <div>
                <a className="credits" href="http://www.freepik.com">{"\n"}Logo and pictures credit</a>
            </div>
        </footer>
    )
}

export default Footer