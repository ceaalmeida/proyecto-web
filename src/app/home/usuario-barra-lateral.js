import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

export default function SwipeableTemporaryDrawer({ values }) {
  const router = useRouter();
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem key={""} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* //{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={""} />
          </ListItemButton>
        </ListItem>
      </List>
      <List>
        <ListItem key={""} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {/* //{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
            </ListItemIcon>
            <ListItemText primary={""} />
          </ListItemButton>
        </ListItem>
        <ListItem key={values} disablePadding>
          <ListItemIcon>
            {/* //{index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
          </ListItemIcon>
          <ListItemText primary={values} />
        </ListItem>
      </List>
      <Divider />
      <ListItemButton
        onClick={() => {
          signOut({
            callbackUrl: "http://localhost:3001",
            redirect: false,
          });
          router.replace("/")
        }}
      >
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={"Cerrar sesion"} />
      </ListItemButton>
      {/* <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <IconButton
        onClick={toggleDrawer("right", true)}
        style={{ justifySelf: "right" }}
      >
        <Avatar alt="User Avatar" src={"https://via.placeholder.com/50"} />
      </IconButton>
      <SwipeableDrawer
        anchor="right"
        open={state.right}
        onClose={toggleDrawer("right", false)}
        onOpen={toggleDrawer("right", true)}
      >
        {list("right")}
      </SwipeableDrawer>
    </div>
  );
}
