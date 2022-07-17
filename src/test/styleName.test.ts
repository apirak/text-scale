import { getReferenceName } from "../styleUtility";

describe("Separete Key from Name", () => {
  it("Separate Simple Name", () => {
    expect(getReferenceName("Large / Super")).toEqual(["Large", "Super"]);
    expect(getReferenceName("Large /  Super")).toEqual(["Large", "Super"]);
    expect(getReferenceName("Large /Super")).toEqual(["Large", "Super"]);
    expect(getReferenceName("Large/Super")).toEqual(["Large", "Super"]);
    expect(getReferenceName("XXLarge/Super")).toEqual(["XXLarge", "Super"]);
  });

  it("Separate Name with space", () => {
    expect(getReferenceName("Large / Super man")).toEqual([
      "Large",
      "Super man",
    ]);
    expect(getReferenceName("Large /  Super man")).toEqual([
      "Large",
      "Super man",
    ]);
    expect(getReferenceName("Large /Super man")).toEqual([
      "Large",
      "Super man",
    ]);
    expect(getReferenceName("Large/Super man")).toEqual(["Large", "Super man"]);
    expect(getReferenceName("XXLarge/Super man")).toEqual([
      "XXLarge",
      "Super man",
    ]);
  });

  it("Separate two folder", () => {
    expect(getReferenceName("Large / Super / man")).toEqual([
      "Large",
      "Super/man",
    ]);
    expect(getReferenceName("Large /  Super / man")).toEqual([
      "Large",
      "Super/man",
    ]);
    expect(getReferenceName("Large /Super /man")).toEqual([
      "Large",
      "Super/man",
    ]);
    expect(getReferenceName("Large/Super /man")).toEqual([
      "Large",
      "Super/man",
    ]);
    expect(getReferenceName("XXLarge/Super /  man")).toEqual([
      "XXLarge",
      "Super/man",
    ]);
  });
});
