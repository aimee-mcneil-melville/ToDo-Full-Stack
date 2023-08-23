// server/server.js
import express from "express";
import * as Path2 from "node:path";

// server/routes.jsx
import { Router } from "express";
import { renderToStaticMarkup } from "react-dom/server";

// server/lib.js
import fs from "node:fs/promises";
import * as Path from "node:path";
var filepath = Path.resolve("./server/data/data.json");
async function getPuppyData() {
  const contents = await fs.readFile(filepath, "utf-8");
  const data = JSON.parse(contents);
  return data.puppies;
}
async function savePuppyData(puppies) {
  const data = { puppies };
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(filepath, json, "utf-8");
}
async function getPuppyById(id) {
  const puppyData = await getPuppyData();
  const puppyDetails = puppyData.find((pup) => pup.id === id);
  if (!puppyDetails) {
    const error = new Error("ID not found");
    error.code = 404;
    throw error;
  }
  return puppyDetails;
}
async function addNewPuppy(newPuppy) {
  const puppyData = await getPuppyData();
  newPuppy.id = puppyData.length + 1;
  puppyData.push(newPuppy);
  await savePuppyData(puppyData);
  return newPuppy.id;
}
async function editPuppy(puppy) {
  const puppyData = await getPuppyData();
  const foundPuppy = puppyData.find((pup) => pup.id === puppy.id);
  if (!foundPuppy) {
    const error = new Error("ID not found");
    error.code = 404;
    throw error;
  }
  const { name, owner, image, breed } = puppy;
  foundPuppy.name = name;
  foundPuppy.owner = owner;
  foundPuppy.image = image;
  foundPuppy.breed = breed;
  await savePuppyData(puppyData);
}

// server/components/Home.jsx
import { jsx } from "react/jsx-runtime";
function Home({ puppies }) {
  return /* @__PURE__ */ jsx("div", { class: "container", children: puppies.map(({ id, name, image }) => /* @__PURE__ */ jsx("div", { class: "puppy-list", children: /* @__PURE__ */ jsx("a", { href: `/${id}`, children: /* @__PURE__ */ jsx("img", { class: "img-circle", src: image, alt: name }) }) })) });
}
var Home_default = Home;

// server/components/Details.jsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Details(props) {
  const { name, breed, owner, image, id } = props.puppyDetails;
  return /* @__PURE__ */ jsxs("div", { className: "puppy", children: [
    /* @__PURE__ */ jsx2("img", { className: "img-circle", src: image, alt: name }),
    /* @__PURE__ */ jsx2("h2", { children: name }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Breed: ",
      breed
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Owner: ",
      owner
    ] }),
    /* @__PURE__ */ jsx2("a", { href: `/edit/${id}`, children: "Edit" })
  ] });
}
var Details_default = Details;

// server/components/Layout.jsx
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
function Layout({ children }) {
  return /* @__PURE__ */ jsxs2("html", { children: [
    /* @__PURE__ */ jsxs2("head", { children: [
      /* @__PURE__ */ jsx3("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx3("title", { children: "Pupparazzi" }),
      /* @__PURE__ */ jsx3(
        "link",
        {
          href: "https://fonts.googleapis.com/css?family=Spirax",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx3(
        "link",
        {
          href: "https://fonts.googleapis.com/css?family=Roboto",
          rel: "stylesheet"
        }
      ),
      /* @__PURE__ */ jsx3("link", { rel: "stylesheet", href: "/main.css" }),
      /* @__PURE__ */ jsx3("link", { rel: "icon", href: "data:," })
    ] }),
    /* @__PURE__ */ jsxs2("body", { children: [
      /* @__PURE__ */ jsxs2("div", { className: "app", children: [
        /* @__PURE__ */ jsx3("h1", { className: "title", children: "Pupparazzi" }),
        /* @__PURE__ */ jsx3("a", { className: "nav", href: "/", children: "Home" }),
        /* @__PURE__ */ jsx3("a", { className: "nav", href: "/new", children: "Add Puppy" })
      ] }),
      children
    ] })
  ] });
}
var Layout_default = Layout;

// server/components/Edit.jsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function Edit({ puppyDetails }) {
  const { id, name, breed, owner, image } = puppyDetails;
  return /* @__PURE__ */ jsxs3("form", { className: "form", action: `/edit/${id}`, method: "post", children: [
    /* @__PURE__ */ jsx4("img", { className: "img-circle", src: image, alt: name }),
    /* @__PURE__ */ jsxs3("label", { htmlFor: "name", className: "form-item", children: [
      "Name:",
      /* @__PURE__ */ jsx4("input", { type: "text", name: "name", defaultValue: name })
    ] }),
    /* @__PURE__ */ jsxs3("label", { htmlFor: "breed", className: "form-item", children: [
      "Breed:",
      /* @__PURE__ */ jsx4("input", { type: "text", name: "breed", defaultValue: breed })
    ] }),
    /* @__PURE__ */ jsxs3("label", { htmlFor: "owner", className: "form-item", children: [
      "Owner:",
      /* @__PURE__ */ jsx4("input", { type: "text", name: "owner", defaultValue: owner })
    ] }),
    /* @__PURE__ */ jsx4("input", { type: "hidden", name: "image", defaultValue: image }),
    /* @__PURE__ */ jsx4("input", { type: "submit", name: "", defaultValue: "Submit" })
  ] });
}
var Edit_default = Edit;

// server/components/New.jsx
import { Fragment, jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function New() {
  return /* @__PURE__ */ jsxs4(Fragment, { children: [
    /* @__PURE__ */ jsx5("h2", { className: "title", children: "Add a new puppy" }),
    /* @__PURE__ */ jsxs4("form", { className: "form", action: "/new", method: "post", children: [
      /* @__PURE__ */ jsxs4("label", { htmlFor: "name", className: "form-item", children: [
        "Name: ",
        /* @__PURE__ */ jsx5("input", { type: "text", name: "name" })
      ] }),
      /* @__PURE__ */ jsxs4("label", { htmlFor: "breed", className: "form-item", children: [
        "Breed: ",
        /* @__PURE__ */ jsx5("input", { type: "text", name: "breed" })
      ] }),
      /* @__PURE__ */ jsxs4("label", { htmlFor: "owner", className: "form-item", children: [
        "Owner:",
        /* @__PURE__ */ jsx5("input", { type: "text", name: "owner" })
      ] }),
      /* @__PURE__ */ jsxs4("label", { htmlFor: "image", className: "form-item", children: [
        "Image URL: ",
        /* @__PURE__ */ jsx5("input", { type: "text", name: "image" })
      ] }),
      /* @__PURE__ */ jsx5("input", { type: "submit", value: "Submit" })
    ] })
  ] });
}
var New_default = New;

// server/routes.jsx
import { jsx as jsx6 } from "react/jsx-runtime";
var router = Router();
var routes_default = router;
router.get("/", async (req, res, next) => {
  try {
    const puppyData = await getPuppyData();
    res.send(
      renderToStaticMarkup(
        /* @__PURE__ */ jsx6(Layout_default, { children: /* @__PURE__ */ jsx6(Home_default, { puppies: puppyData }) })
      )
    );
  } catch (err) {
    next(err);
  }
});
router.get("/edit/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const puppyDetails = await getPuppyById(id);
    res.send(
      renderToStaticMarkup(
        /* @__PURE__ */ jsx6(Layout_default, { children: /* @__PURE__ */ jsx6(Edit_default, { puppyDetails }) })
      )
    );
  } catch (err) {
    next(err);
  }
});
router.post("/edit/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name, breed, owner, image } = req.body;
    const updatedPuppy = { id, name, breed, owner, image };
    await editPuppy(updatedPuppy);
    res.redirect("/" + id);
  } catch (err) {
    if (err.code === 404) {
      res.sendStatus(404);
      return;
    }
    next(err);
  }
});
router.get("/new", (req, res) => {
  res.send(
    renderToStaticMarkup(
      /* @__PURE__ */ jsx6(Layout_default, { children: /* @__PURE__ */ jsx6(New_default, {}) })
    )
  );
});
router.post("/new", async (req, res, next) => {
  try {
    const { name, breed, owner, image } = req.body;
    const newPuppy = { name, breed, owner, image };
    const id = await addNewPuppy(newPuppy);
    res.redirect("/" + id);
  } catch (err) {
    next(err);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const puppyDetails = await getPuppyById(id);
    res.send(
      renderToStaticMarkup(
        /* @__PURE__ */ jsx6(Layout_default, { children: /* @__PURE__ */ jsx6(Details_default, { puppyDetails }) })
      )
    );
  } catch (err) {
    if (err.code === 404) {
      res.sendStatus(404);
      return;
    }
    next(err);
  }
});

// server/server.js
var server = express();
var __dirname = Path2.dirname(new URL(import.meta.url).pathname);
var publicFolder = Path2.join(__dirname, "../public");
server.use(express.static(publicFolder));
server.use(express.urlencoded({ extended: false }));
server.use("/", routes_default);
var server_default = server;

// server/index.js
var port = process.env.PORT || 3e3;
server_default.listen(port, () => {
  console.log("Server is listening on port", port);
});
