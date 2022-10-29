const { compileFromFile } = require("json-schema-to-typescript");
const fs = require("fs");
const glob = require("glob");
const { promisify } = require("util");
const path = require("path");

const globPromise = promisify(glob);

const SCHEMAS_PATH = "src/monaco-editor-schemas";
const GENERATED_TYPES_PATH = "src/generated-types";

async function getSchemaFilePaths() {
  const files = await globPromise(
    `${process.cwd()}/${SCHEMAS_PATH}/*.json`,
    {},
  );
  return files;
}

async function getTypesByName(filePaths) {
  const types = await Promise.all(
    filePaths.map((filePath) => {
      const fn = async () => {
        const fileName = path.parse(filePath).name;
        const types = await compileFromFile(filePath);
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
  const filePaths = await getSchemaFilePaths();
  const typesByName = await getTypesByName(filePaths);
  await writeTypesToFiles(
    typesByName,
    `${process.cwd()}/${GENERATED_TYPES_PATH}`,
  );
}

start();
