"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import assets from "@/assets";

const LOGO_SRC = assets.images.logo;

// Set to true when table reservations go live.
const SHOW_RESERVE = false;

// Colors come straight from globals.css so the MUI theme (the red) is never used.
const C = {
  bar: "var(--espresso-900)",
  barDeep: "var(--espresso-950)",
  accent: "var(--caramel-400)",
  cream: "var(--cream-200)",
  tan: "var(--copper)",
};

const leftLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
];
const rightLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
const allLinks = [...leftLinks, ...rightLinks];

function Logo({ size, hang = false }: { size: number; hang?: boolean }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        border: "3px solid",
        borderColor: C.accent,
        bgcolor: "#fff",
        flexShrink: 0,
        // double ring, like an enamel signboard
        boxShadow: hang
          ? `0 0 0 4px ${C.bar}, 0 0 0 5.5px ${C.accent}, 0 10px 22px rgba(0,0,0,0.35)`
          : "none",
      }}
    >
      <Image
        src={LOGO_SRC}
        alt="SriMuruganCafe"
        fill
        priority
        sizes="120px"
        style={{ objectFit: "cover", transformOrigin: "52% 30%" }}
      />
    </Box>
  );
}

function Diamond() {
  return (
    <Box
      aria-hidden
      sx={{
        width: 5,
        height: 5,
        bgcolor: C.accent,
        opacity: 0.55,
        transform: "rotate(45deg)",
        flexShrink: 0,
      }}
    />
  );
}

function NavLink({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Button
      component={Link}
      href={href}
      disableRipple
      sx={{
        position: "relative",
        color: active ? C.accent : C.cream,
        fontFamily: "inherit",
        fontSize: "0.78rem",
        fontWeight: 600,
        letterSpacing: "0.26em",
        px: 2,
        py: 1.25,
        borderRadius: 0,
        "&::after": {
          content: '""',
          position: "absolute",
          left: "50%",
          bottom: 2,
          height: 2,
          width: active ? "60%" : 0,
          bgcolor: C.accent,
          transform: "translateX(-50%)",
          transition: "width .25s ease",
        },
        "&:hover": { bgcolor: "transparent", color: C.accent },
        "&:hover::after": { width: "60%" },
      }}
    >
      {label}
    </Button>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: C.bar,
          backgroundImage: "none",
          color: C.cream,
          borderBottom: "2px solid",
          borderColor: C.accent,
          overflow: "visible", // lets the logo medallion hang below the bar
          // thin inner rule = classic double-line border
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 3,
            height: "1px",
            bgcolor: C.accent,
            opacity: 0.35,
            pointerEvents: "none",
          },
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 72, md: 96 },
            px: { xs: 2, md: 4 },
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "1fr auto 1fr" },
            alignItems: "center",
            justifyContent: { xs: "space-between" },
            columnGap: { md: 8, lg: 12 },
            maxWidth: 1360,
            width: "100%",
            mx: "auto",
          }}
        >
          {/* Desktop: left links */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
              gap: { md: 3, lg: 4 },
            }}
          >
            {leftLinks.map((l, i) => (
              <Box
                key={l.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { md: 3, lg: 4 },
                }}
              >
                <NavLink {...l} active={pathname === l.href} />
                {i < leftLinks.length - 1 && <Diamond />}
              </Box>
            ))}
          </Box>

          {/* Logo: small on mobile, hanging medallion on desktop */}
          <Link
            href="/"
            style={{ display: "flex" }}
            aria-label="SriMuruganCafe home"
          >
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Logo size={52} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                position: "relative",
                top: 14,
                transition: "transform .3s ease",
                "&:hover": { transform: "rotate(-4deg) scale(1.03)" },
              }}
            >
              <Logo size={112} hang />
            </Box>
          </Link>

          {/* Desktop: right links + reserve */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "flex-start",
              gap: { md: 3, lg: 4 },
            }}
          >
            {rightLinks.map((l, i) => (
              <Box
                key={l.href}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: { md: 3, lg: 4 },
                }}
              >
                <NavLink {...l} active={pathname === l.href} />
                {i < rightLinks.length - 1 && <Diamond />}
              </Box>
            ))}
            {SHOW_RESERVE && (
              <Button
                component={Link}
                href="/reservation"
                disableElevation
                sx={{
                  ml: { md: 3, lg: 5 },
                  px: 3.5,
                  py: 1.1,
                  borderRadius: "9999px",
                  fontFamily: "inherit",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  bgcolor: C.accent,
                  color: C.barDeep,
                  border: "2px solid",
                  borderColor: C.accent,
                  transition: "all .2s ease",
                  "&:hover": {
                    bgcolor: "transparent",
                    color: C.accent,
                  },
                }}
              >
                Reserve
              </Button>
            )}
          </Box>

          {/* Mobile burger */}
          <IconButton
            aria-label="open menu"
            onClick={() => setOpen(true)}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: C.accent,
              border: "1px solid",
              borderColor: "rgba(224,169,109,0.5)",
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: "80vw",
              maxWidth: 360,
              bgcolor: C.bar,
              backgroundImage: "none",
              color: C.cream,
              display: "flex",
              flexDirection: "column",
              borderLeft: "2px solid",
              borderColor: C.accent,
            },
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1.5,
          }}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            style={{ display: "flex" }}
          >
            <Logo size={52} />
          </Link>
          <IconButton
            aria-label="close menu"
            onClick={() => setOpen(false)}
            sx={{ color: C.accent, bgcolor: "rgba(224,169,109,0.12)" }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ borderColor: "rgba(224,169,109,0.4)" }} />

        <List sx={{ px: 2, py: 0 }}>
          {allLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Box key={l.href}>
                <ListItemButton
                  component={Link}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  sx={{ px: 0, py: 2, gap: 1.5 }}
                >
                  {active && <Diamond />}
                  <ListItemText
                    primary={l.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontWeight: 700,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          fontSize: "0.85rem",
                          color: active ? C.accent : C.cream,
                        },
                      },
                    }}
                  />
                </ListItemButton>
                <Divider sx={{ borderColor: "rgba(251,232,205,0.12)" }} />
              </Box>
            );
          })}
        </List>

        {SHOW_RESERVE && (
          <Box sx={{ px: 2, mt: 3 }}>
            <Button
              component={Link}
              href="/reservation"
              fullWidth
              size="large"
              disableElevation
              onClick={() => setOpen(false)}
              sx={{
                borderRadius: "9999px",
                fontFamily: "inherit",
                fontWeight: 700,
                letterSpacing: "0.18em",
                bgcolor: C.accent,
                color: C.barDeep,
                "&:hover": { bgcolor: C.tan },
              }}
            >
              Reserve a table
            </Button>
          </Box>
        )}

        <Box
          sx={{
            mt: "auto",
            p: 2,
            textAlign: "center",
            fontSize: "0.7rem",
            letterSpacing: "0.25em",
            color: "rgba(251,232,205,0.55)",
          }}
        >
          COIMBATORE · EST. 1967
        </Box>
      </Drawer>
    </>
  );
}
