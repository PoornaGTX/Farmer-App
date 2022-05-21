import { NavLink } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  const { user } = useAppContext();
  let newLinks = links;
  if (user.type === "Customer") {
    newLinks = links.filter((link) => {
      if (link.path !== "add-product") {
        return link;
      }
    });
  }
  if (user.type === "Farmer") {
    newLinks = links.filter((link) => {
      if (link.path !== "add-to-cart") {
        return link;
      }
    });
  }
  return (
    <div className="nav-links">
      {newLinks.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            key={id}
            onClick={toggleSidebar}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavLinks;
