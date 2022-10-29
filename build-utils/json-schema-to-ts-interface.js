const { compileFromFile } = require("json-schema-to-typescript");
const fs = require("fs");
const glob = require("glob");
const { promisify } = require("util");
const path = require("path");

const globPromise = promisify(glob);

const SCHEMAS_PATH = "src/monaco-editor-schemas";
const GENERATED_TYPES_PATH = "src/generated-types";

async function getSchemaPaths() {
  const files = await globPromise(
    `${process.cwd()}/${SCHEMAS_PATH}/*.json`,
    {},
  );
  return files;
}

async function getTypesByName(files) {
  const types = await Promise.all(
    files.map((file) => {
      const fn = async () => {
        const fileName = path.parse(file).name;
        const types = await compileFromFile(file);
        return { fileName, types };
      };
      return fn();
    }),
  );
  return types;
}

async function writeTypesToFiles(typesByName, folderPath) {
  await Promise.all(
    typesByName.map(({ fileName, types }) => {
      const fn = async () => {
        const pathToFile = `${folderPath}/${fileName}.interface.ts`;
        await fs.mkdir(
          path.dirname(pathToFile),
          { recursive: true },
          function () {
            fs.writeFileSync(pathToFile, types, () => console.log("cool"));
          },
        );
      };
      return fn();
    }),
  );
}

async function start() {
  const files = await getSchemaPaths();
  const typesByName = await getTypesByName(files);
  await writeTypesToFiles(
    typesByName,
    `${process.cwd()}/${GENERATED_TYPES_PATH}`,
  );
}

start();
