import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import React from "react";
import ProfileMenu from "../miscellaneous/ProfileMenu";
import { ChatState } from "../../context/ChatProvider";
import { useNavigate } from "react-router-dom";

function Header() {
  const headerMenu = [
    {
      id: 1,
      name: "Transport",
      icon: "/truck.png",
    },
    {
      id: 2,
      name: "Package",
      icon: "/box.png",
    },
  ];

  const { user } = ChatState();
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="header-container">
      <div className="header-final">
        <Image
          src="/car-carrier.jpg"
          mt={2}
          width={50}
          height={50}
          alt="Logo"
        />
        <div className="header-menu">
          {headerMenu.map((it, i) => (
            <div className="header-icon" key={i}>
              <Image src={it.icon} width={25} height={25} />
              <h2 className="header-text">{it.name}</h2>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Menu>
          <MenuButton p={1}></MenuButton>
        </Menu>

        <Menu>
          <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user?.fullName}
              src={user?.photo}
            />
          </MenuButton>
          <MenuList>
            <ProfileMenu user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileMenu>
            <MenuDivider />
            <MenuItem>Manage Profile</MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
