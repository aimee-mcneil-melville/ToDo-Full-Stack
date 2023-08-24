// server/server.js
import express2 from "express";

// server/routes/index.jsx
import express from "express";
import { renderToStaticMarkup } from "react-dom/server";

// server/components/Layout.jsx
function Layout({ children }) {
  return `<html>
<head>
  <title>Dev Academy Phase 1 Express Boilerplate</title>
</head>

<body>
 ${children}
</body>

</html>`;
}
var Layout_default = Layout;

// server/components/Index.jsx
import { jsx } from "react/jsx-runtime";
function Index() {
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("h1", { children: "Index" }) });
}
var Index_default = Index;

// server/routes/index.jsx
import { jsx as jsx2 } from "react/jsx-runtime";
var router = express.Router();
router.get("/", (req, res) => {
  res.send(
    renderToStaticMarkup(
      /* @__PURE__ */ jsx2(Layout_default, { children: /* @__PURE__ */ jsx2(Index_default, {}) })
    )
  );
});

// server/server.js
var server = express2();
server.use(express2.urlencoded({ extended: true }));
var server_default = server;

// server/index.js
var PORT = 3e3;
server_default.listen(PORT, function() {
  console.log("Listening on port", PORT);
});
