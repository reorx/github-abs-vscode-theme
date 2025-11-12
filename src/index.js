const fs = require("fs").promises;
const getTheme = require("./theme");
const getClassicTheme = require("./classic/theme");
const getAbsTheme = require("./abs-theme");


// ABS (Alabaster-Based Syntax) themes

const lightAbsTheme = getAbsTheme({
  theme: "light_abs",
  name: "GitHub Light ABS",
});

const darkAbsTheme = getAbsTheme({
  theme: "dark_abs",
  name: "GitHub Dark ABS",
});

// Write themes

fs.mkdir("./themes", { recursive: true })
  .then(() => Promise.all([
    fs.writeFile("./themes/light-abs.json", JSON.stringify(lightAbsTheme, null, 2)),
    fs.writeFile("./themes/dark-abs.json", JSON.stringify(darkAbsTheme, null, 2)),
  ]))
  .catch(() => process.exit(1))
