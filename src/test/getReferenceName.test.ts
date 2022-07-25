import { getReferenceName } from "../styleUtility";

describe("Separete Key from Name", () => {
  it("Separate Simple Name", () => {
    expect(getReferenceName("Large / Super")).toEqual(["large", "super"]);
    expect(getReferenceName("Large /  Super")).toEqual(["large", "super"]);
    expect(getReferenceName("Large /Super")).toEqual(["large", "super"]);
    expect(getReferenceName("Large/Super")).toEqual(["large", "super"]);
    expect(getReferenceName("XXLarge/Super")).toEqual(["xxlarge", "super"]);
  });


  it("Separate Name with space", () => {
    expect(getReferenceName("Large / Super man")).toEqual([
      "large",
      "super man",
    ]);
    expect(getReferenceName("Large /  Super man")).toEqual([
      "large",
      "super man",
    ]);
    expect(getReferenceName("Large /Super man")).toEqual([
      "large",
      "super man",
    ]);
    expect(getReferenceName("Large/Super man")).toEqual(["large", "super man"]);
    expect(getReferenceName("XXLarge/Super man")).toEqual([
      "xxlarge",
      "super man",
    ]);
  });

  it("Separate two folder", () => {
    expect(getReferenceName("Large / Super / man")).toEqual([
      "large",
      "super/man",
    ]);
    expect(getReferenceName("Large /  Super / man")).toEqual([
      "large",
      "super/man",
    ]);
    expect(getReferenceName("Large /Super /man")).toEqual([
      "large",
      "super/man",
    ]);
    expect(getReferenceName("Large/Super /man")).toEqual([
      "large",
      "super/man",
    ]);
    expect(getReferenceName("XXLarge/Super /  man")).toEqual([
      "xxlarge",
      "super/man",
    ]);
  });

  // TODO: Try add "x / / lksdjf" style to figma and check real style name
  it("Ignore Empty Foler", () => {
    expect(getReferenceName("//Super /man")).toEqual([
      "",
      "super/man",
    ]);
    expect(getReferenceName("/Super /man")).toEqual([
      "",
      "super/man",
    ]);
  });
});
