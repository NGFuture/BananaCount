const Footer = () => {
    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="main-footer">
            <div> Copyright &copy; {year} | &nbsp; </div>
            <a href="https://github.com/NGFuture/BananaCount">GitHub</a>
            <a className="credits" href="http://www.freepik.com">{"\n"}Logo and pictures credit</a>
        </footer>
    )
}

export default Footer