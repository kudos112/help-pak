const DropDown = ({ data }) => {
  return (
    <ul className="nav__submenu">
      {data.map((item) => (
        <>
          <li className="nav__submenu-item ">
            <Link>
              <a>item.title</a>
            </Link>
          </li>
        </>
      ))}
    </ul>
  );
};

export default DropDown;
