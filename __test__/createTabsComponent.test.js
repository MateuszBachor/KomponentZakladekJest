const createTabsComponent = require("../script");

describe("createTabsComponent function: ", () => {
  let container;
  const tabs = [
    { label: "Zakładka1", content: "content1" },
    { label: "Zakładka2", content: "content2" },
    { label: "Zakładka3", content: "content3" },
    { label: "Zakładka4", content: "content4" },
    { label: "Zakładka5", content: "content5" },
    { label: "Zakładka6", content: "content6" },
  ];
  const tabIndexes = [];
  for (let i = 0; i < tabs.length; i++) {
    tabIndexes.push(i);
  }
  beforeEach(() => {
    document.body.innerHTML = '<div id="mainContainer"></div>';
    container = document.getElementById("mainContainer");
    createTabsComponent(container, tabs);
  });

  test("tabsContainer should have as many children as the length of the tabs array", () => {
    const tabsContainer = container.querySelector(".tabsContainer");
    const expectedResult = tabsContainer.children.length;
    const actualResult = tabs.length;
    expect(actualResult).toEqual(expectedResult);
  });

  test("active tab should default is first of tabs", () => {
    // location.reload(); Niepotrzebny bo bedoreEach?
    const activeTab = container.querySelector(".active");
    const actualResult = activeTab.innerHTML;
    const expectedResult = tabs[0].label;
    expect(actualResult).toEqual(expectedResult);
  });

  test.each(tabIndexes)(
    "when clicked, the tab should have the active class",
    (index) => {
      const tabElement = container.querySelector(
        `.tabElement:nth-child(${index + 1})`
      );
      tabElement.click();
      expect(tabElement.className).toEqual(`tabElement active`);
    }
  );

  test.each(tabIndexes)(
    "content container should show tab content",
    (index) => {
      const tabElement = container.querySelector(
        `.tabElement:nth-child(${index + 1})`
      );
      tabElement.click();
      const contentContainer = container.querySelector(".contentContainer");
      expect(contentContainer.innerHTML).toEqual(`${tabs[index].content}`);
    }
  );
  test("tabs should be in the same order as in the tabs array", () => {
    const tabElements = container.querySelectorAll(".tabElement");
    const tabElementsArray = Array.from(tabElements).map(
      (tabElement) => tabElement.innerHTML
    );
    const expectedLabels = tabs.map((tab) => tab.label);
    expect(tabElementsArray).toEqual(expectedLabels);
  });
});

// const createTabsComponent = require("../script");

// describe("createTabsComponent function: ", () => {
//   let container;
//   let tabsData;

//   const generateTabs = (number) => {
//     const tabs = [];
//     for (let i = 0; i < number; i++) {
//       tabs.push({
//         label: `Zakładka${i + 1}`,
//         content: `content${i + 1}`,
//       });
//     }
//     return tabs;
//   };

//   const tabsCounts = [2, 3, 6];

//   beforeEach(() => {
//     tabsData = tabsCounts.map(generateTabs);
//     console.log(tabsData);

//     document.body.innerHTML = '<div id="mainContainer"></div>';
//     container = document.getElementById("mainContainer");
//   });

//   test.each(tabsData)(
//     "tabsContainer should have as many children as the length of the tabs array",
//     (tabs) => {
//       createTabsComponent(container, tabs);
//       const tabsContainer = container.querySelector(".tabsContainer");
//       const expectedResult = tabsContainer.children.length;
//       const actualResult = tabs.length;
//       expect(actualResult).toEqual(expectedResult);
//     }
//   );
// });
