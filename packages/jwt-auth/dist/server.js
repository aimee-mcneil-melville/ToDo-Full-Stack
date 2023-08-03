// server/server.ts
import * as Path2 from "node:path";
import express2 from "express";

// server/routes/fruits.ts
import express from "express";

// server/db/knexfile.js
import * as Path from "node:path";
import * as URL from "node:url";
var __filename = URL.fileURLToPath(import.meta.url);
var __dirname = Path.dirname(__filename);
var knexfile_default = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: Path.join(__dirname, "dev.sqlite3")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  test: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: ":memory:"
    },
    migrations: {
      directory: Path.join(__dirname, "migrations")
    },
    seeds: {
      directory: Path.join(__dirname, "seeds")
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  },
  production: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "/app/storage/prod.sqlite3"
    },
    pool: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    }
  }
};

// server/db/connection.ts
import knex from "knex";
var environment = process.env.NODE_ENV || "development";
var config = knexfile_default[environment];
var connection = knex.default(config);
var connection_default = connection;

// server/db/fruits.ts
function getFruits(db = connection_default) {
  return db("fruits").select(
    "id",
    "name",
    "average_grams_each as averageGramsEach",
    "added_by_user as addedByUser"
  ).orderBy("id");
}
function addFruit(fruit, db = connection_default) {
  return db("fruits").insert(fruit);
}
function updateFruit(newFruit, db = connection_default) {
  return db("fruits").where("id", newFruit.id).update(newFruit);
}
function deleteFruit(id, db = connection_default) {
  return db("fruits").where("id", id).delete();
}
function userCanEdit(fruitId, auth0Id, db = connection_default) {
  return db("fruits").where("id", fruitId).first().then((fruit) => {
    if (fruit.added_by_user !== auth0Id) {
      throw new Error("Unauthorized");
    }
  });
}

// server/routes/fruits.ts
var router = express.Router();
router.get("/", (req, res) => {
  getFruits().then((fruits) => res.json({ fruits })).catch((err) => {
    console.error(err);
    res.status(500).send("Something went wrong");
  });
});
router.post("/", (req, res) => {
  const { fruit } = req.body;
  const auth0Id = req.auth?.sub;
  if (!auth0Id) {
    console.error("No auth0Id");
    return res.status(401).send("Unauthorized");
  }
  const newFruit = {
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach
  };
  addFruit(newFruit).then(() => getFruits()).then((fruits) => res.json({ fruits })).catch((err) => {
    console.error(err);
    res.status(500).send("Something went wrong");
  });
});
router.put("/", (req, res) => {
  const { fruit } = req.body;
  const auth0Id = req.auth?.sub;
  const fruitToUpdate = {
    id: fruit.id,
    added_by_user: auth0Id,
    name: fruit.name,
    average_grams_each: fruit.averageGramsEach
  };
  if (!auth0Id) {
    console.error("No auth0Id");
    return res.status(401).send("Unauthorized");
  }
  userCanEdit(fruit.id, auth0Id).then(() => updateFruit(fruitToUpdate)).then(() => getFruits()).then((fruits) => res.json({ fruits })).catch((err) => {
    console.error(err);
    if (err.message === "Unauthorized") {
      res.status(403).send("Unauthorized: Only the user who added the fruit may update it");
    } else {
      res.status(500).send("Something went wrong");
    }
  });
});
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const auth0Id = req.auth?.sub;
  if (!auth0Id) {
    console.error("No auth0Id");
    return res.status(401).send("Unauthorized");
  }
  userCanEdit(id, auth0Id).then(() => deleteFruit(id)).then(() => getFruits()).then((fruits) => res.json({ fruits })).catch((err) => {
    console.error(err);
    if (err.message === "Unauthorized") {
      res.status(403).send("Unauthorized: Only the user who added the fruit may update it");
    } else {
      res.status(500).send("Something went wrong");
    }
  });
});
var fruits_default = router;

// server/server.ts
var server = express2();
server.use(express2.json());
server.use("/api/v1/fruits", fruits_default);
if (process.env.NODE_ENV === "production") {
  server.use(express2.static(Path2.resolve("public")));
  server.use("/assets", express2.static(Path2.resolve("./dist/assets")));
  server.get("*", (req, res) => {
    res.sendFile(Path2.resolve("./dist/index.html"));
  });
}
var server_default = server;

// server/index.ts
var port = 3e3;
server_default.listen(port, () => {
  console.log("Server listening on port", port);
});
