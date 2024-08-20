import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { AddCircleOutline, SubjectOutlined } from "@mui/icons-material";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { format } from "date-fns";
import { Avatar } from "@mui/material";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  page: {
    backgroundColor: "#f9f9f9",
    width: "100%",
  },
  drawer: {
    width: drawerWidth,
  },
  paperWidth: {
    width: drawerWidth,
  },
  root: {
    display: "flex",
  },
  active: {
    background: "#f4f4f4",
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  toolbar: theme.mixins.toolbar,
  date: {
    flexGrow: 1,
  },
  avatar: {
    marginLeft: theme.spacing(4),
  },
}));

function Layout({ children }) {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const menuItem = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutline color="secondary" />,
      path: "/create",
    },
  ];
  //
  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar elevation={0} sx={{ width: `calc(100% - ${drawerWidth}px)` }}>
        <Toolbar>
          <Typography className={classes.date}>
            Today is the {format(new Date(), "do MMMM Y")}
          </Typography>
          <Typography>Ibrahim</Typography>
          <Avatar
            sx={{ marginLeft: 2 }}
            src="/avatar.jpg"
            className="classes.avatar"
          />
        </Toolbar>
      </AppBar>

      {/* side bar */}
      <Drawer
        classes={{ paper: classes.paperWidth }}
        className={classes.drawer}
        anchor="left"
        variant="permanent"
        sx={{
          width: {
            xs: drawerWidth * 0.6,
            sm: drawerWidth * 0.8,
            md: drawerWidth,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: {
              xs: drawerWidth * 0.6,
              sm: drawerWidth * 0.8,
              md: drawerWidth,
            },
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          ToDos Notes
        </Typography>

        <List>
          {menuItem.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => history.push(item.path)}
            >
              <ListItem
                className={
                  location.pathname == item.path ? classes.active : null
                }
                key={item.text}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
}

export default Layout;
