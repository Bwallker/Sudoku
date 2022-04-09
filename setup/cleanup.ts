import * as fs from 'fs';
import * as path from 'path';
import getPath from './getPath.js';

const { __dirname } = getPath(import.meta.url);

const cleanup = (): void => {
  const sourceDir = path.resolve(__dirname, '..', 'setup');
  const targetDir = __dirname;
  while (
    recurse(
      fs.readdirSync(targetDir),
      fs.readdirSync(sourceDir),
      fs.realpathSync(targetDir),
      fs.realpathSync(sourceDir),
    )
  );
};

const recurse = (
  targetDir: string[],
  sourceDir: string[],
  targetPath: string,
  sourcePath: string,
): boolean => {
  let i = 0;
  while (true) {
    const target = targetDir[i];
    const source = sourceDir[i];
    if (target === undefined) {
      return false;
    }
    if (source === undefined) {
      const fullTargetPath = path.join(targetPath, target);
      fs.rmSync(fullTargetPath, { force: true, recursive: true });
      return true;
    }
    const fullTargetPath = path.join(targetPath, target);
    const fullSourcePath = path.join(sourcePath, source);
    if (!twoItemsEqual(target, source)) {
      fs.rmSync(fullTargetPath, { force: true, recursive: true });
      return true;
    }
    if (target.indexOf('.') === -1) {
      if (
        recurse(
          fs.readdirSync(fullTargetPath),
          fs.readdirSync(fullSourcePath),
          fullTargetPath,
          fullSourcePath,
        )
      ) {
        return true;
      }
    }
    i++;
  }
};

const twoItemsEqual = (targetItem: string, sourceItem: string): boolean => {
  if (targetItem.indexOf('.') === -1) {
    return targetItem === sourceItem;
  }
  return (
    targetItem.substring(0, targetItem.length - 2) ===
    sourceItem.substring(0, sourceItem.length - 2)
  );
};

cleanup();
