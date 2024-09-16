import "./topbar.css";
import MenuButton from "../MenuButton";
import Backdrop from "../Backdrop";
const Topbar = ({
  setPage,
  page,
  openMenu,
  setOpenMenu,
  setOptionsOpen,
}: {
  setPage: (page: "overview" | "countryView" | "monthlyView") => void;
  page: string;
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
  setOptionsOpen: (openMenu: boolean) => void;
}) => {
  return (
    <>
      <Backdrop open={openMenu} onClick={() => setOpenMenu(false)} />
      <div className="topbar mobile-bar">
        <MenuButton
          onClick={() => setOpenMenu(!openMenu)}
          className="mobile-menu-toggle"
        >
          Navigation
        </MenuButton>
        <MenuButton
          onClick={() => setOptionsOpen(!openMenu)}
          className="mobile-menu-toggle"
        >
          Options
        </MenuButton>
      </div>
      <nav
        className={`topbar ${openMenu ? " open" : ""}`}
        style={{ zIndex: 10 }}
      >
        <ul className="topbar-content">
          <li>
            <MenuButton
              className={page === "overview" ? "active" : ""}
              onClick={() => {
                setOpenMenu(false);
                setPage("overview");
              }}
            >
              Overview
            </MenuButton>
          </li>
          <li>
            <MenuButton
              className={page === "countryView" ? "active" : ""}
              onClick={() => {
                setOpenMenu(false);
                setPage("countryView");
              }}
            >
              Country View
            </MenuButton>
          </li>
          <li>
            <MenuButton
              className={page === "monthlyView" ? "active" : ""}
              onClick={() => {
                setOpenMenu(false);
                setPage("monthlyView");
              }}
            >
              Monthly View
            </MenuButton>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Topbar;
