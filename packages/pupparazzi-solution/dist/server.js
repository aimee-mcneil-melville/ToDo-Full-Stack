// server/server.ts
import express2 from "express";

// server/routes/puppies.ts
import express from "express";

// server/store.ts
import * as fs from "node:fs/promises";
import { existsSync } from "node:fs";
import * as Path from "node:path";

// server/initial-data.ts
var initial_data_default = {
  puppies: [
    {
      id: 1,
      name: "Fido",
      owner: "Fred",
      image: "/images/puppy1.jpg",
      breed: "Labrador"
    },
    {
      id: 2,
      name: "Coco",
      owner: "Chloe",
      image: "/images/puppy2.jpg",
      breed: "Labrador"
    },
    {
      id: 3,
      name: "Magnum",
      owner: "Michael",
      image: "/images/puppy3.jpg",
      breed: "Rottweiler"
    },
    {
      id: 4,
      name: "Sadie",
      owner: "Sam",
      image: "/images/puppy4.jpg",
      breed: "Labrador"
    },
    {
      id: 5,
      name: "Murphy",
      owner: "Matthew",
      image: "/images/puppy5.jpg",
      breed: "Pug"
    },
    {
      id: 6,
      name: "Bella",
      owner: "Brianna",
      image: "/images/puppy6.jpg",
      breed: "Labrador"
    },
    {
      id: 7,
      name: "Rocky",
      owner: "Ricky",
      image: "/images/puppy7.jpg",
      breed: "Labrador"
    }
  ]
};

// server/store.ts
var path = Path.resolve("storage/data.json");
async function read() {
  if (existsSync(path)) {
    const json = await fs.readFile(path, "utf-8");
    const obj = JSON.parse(json);
    return obj;
  } else {
    return initial_data_default;
  }
}
async function write(obj) {
  const json = JSON.stringify(obj);
  await fs.writeFile(path, json, "utf-8");
}
async function getAll() {
  const data = await read();
  return data.puppies;
}
async function create(data) {
  const { puppies } = await read();
  const maxId = Math.max(...puppies.map((pup) => pup.id));
  const id = maxId + 1;
  const newPuppies = [...puppies, { ...data, id }];
  await write({ puppies: newPuppies });
  return id;
}
async function byId(id) {
  const { puppies } = await read();
  const puppy = puppies.find((pup) => pup.id === id);
  return puppy;
}
async function deleteById(id) {
  const { puppies } = await read();
  const newPuppies = puppies.filter((pup) => pup.id !== id);
  await write({ puppies: newPuppies });
}
async function update(id, values) {
  const { puppies } = await read();
  const newPuppies = puppies.map((pup) => {
    if (pup.id !== id) {
      return pup;
    }
    return { ...pup, ...values };
  });
  await write({ puppies: newPuppies });
}

// server/routes/puppies.ts
var router = express.Router();
router.get("/", async (req, res, next) => {
  try {
    const puppies = await getAll();
    res.json(puppies);
  } catch (error) {
    next(error);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    if (typeof data.name !== "string" || data.name === "" || typeof data.owner !== "string" || data.owner === "" || typeof data.breed !== "string" || data.breed == "" || typeof data.image !== "string" || data.image === "") {
      res.sendStatus(422);
      return;
    }
    const id = await create(data);
    const location = `/api/v1/puppies/${id}`;
    res.status(201).setHeader("Location", location).json({ location });
  } catch (error) {
    next(error);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(404);
      return;
    }
    const pup = await byId(id);
    if (pup == void 0) {
      res.status(404);
    }
    res.json(pup);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await deleteById(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    await update(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
var puppies_default = router;

// server/server.ts
var server = express2();
server.use(express2.json());
server.use("/api/v1/puppies", puppies_default);
var server_default = server;

// server/index.ts
var port = 3e3;
server_default.listen(port, function() {
  console.log("Server is listening on port", port);
});
