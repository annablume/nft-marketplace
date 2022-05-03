import Image from "next/image";
import Link from "next/link";
import { Wallet } from "../../blockchain/Wallet";
import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { AiOutlineMenu } from "react-icons/ai";
import { useState } from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import CollectionsIcon from "@mui/icons-material/Collections";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface NavbarButtonProps {
  text?: string;
  path: string;
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <section>
      {/* DESKTOP NAVBAR */}

      <div className=" hidden desktop:flex fixed flex-col w-full items-center space-y-3 desktop:flex-row justify-between  ">
        <div className="flex p-2 space-x-3">
          {/* The Image below generates "Warning: Prop `style` did not match" an erro in the console */}
          <Image
            src="/Logo_LooksSea.png"
            alt="LooksSea logo"
            width={"40px"}
            height={"40px"}
          />
          <p className="font-bold text-4xl">LooksSea</p>
        </div>
        <div className="display-mobile">
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 600,
            }}
          >
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search LooksSea"
              inputProps={{ "aria-label": "search looksSea" }}
            />
          </Paper>
        </div>

        <NavbarButton text="My collection" path="/" />
        <NavbarButton text="Mint and sell" path="/" />

        <Wallet isMobile={false} />
      </div>

      {/* MOBILE NAVBAR */}

      <div className=" fixed flex-col w-full items-center space-y-3 flex justify-between desktop:hidden ">
        <div className="tablet:flex tablet:justify-around tablet:w-full">
          <div className="flex p-2 space-x-3">
            {/* The Image below generates "Warning: Prop `style` did not match" an erro in the console */}
            <Image
              src="/Logo_LooksSea.png"
              alt="LooksSea logo"
              width={"40px"}
              height={"40px"}
            />
            <p className="font-bold text-4xl">LooksSea</p>
          </div>

          <div className=" inline-flex">
            <Wallet isMobile={true} />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="item-center justify-center"
            >
              {isMobileMenuOpen ? (
                <TemporaryDrawer />
              ) : (
                <AiOutlineMenu color="black" size="28" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

const NavbarButton = ({ text, path }: NavbarButtonProps) => {
  return (
    <button className="items-center py-2 px-6 mx-0 mt-2 mb-0 font-semibold text-center normal-case whitespace-nowrap bg-none rounded-full border-2 border-solid cursor-pointer box-border border-stone-500 bg-zinc-800 text-stone-200 hover:border-neutral-600">
      <Link href={path}>{text}</Link>
    </button>
  );
};

export default function TemporaryDrawer() {
  const [state, setState] = useState(true); // The drawer is open by default

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState(open);
    };

  const list = () => (
    <Box onClick={toggleDrawer(false)}>
      <List>
        {["My collection", "Mint and sell"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <CollectionsIcon /> : <SwapHorizIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Github", "Twitter"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <GitHubIcon /> : <TwitterIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)} // Close the drawer
      >
        {list()}
      </Drawer>
    </div>
  );
}
