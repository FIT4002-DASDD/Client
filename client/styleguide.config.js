module.exports = {
  title: "DASDD React Component Documentation",
  getExampleFilename(filename) {
    const name = filename.match(/([^(/|\\)]+$)/g)[0];
    return filename.replace(
      name,
      "examples\\" + name.replace(/\.tsx?$/, ".md")
    );
  },
};
