"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/library.ts
  var library = function() {
    window.fsAttributes = window.fsAttributes || [];
    window.fsAttributes.push([
      "cmsload",
      (listInstances) => {
        listInstances.forEach((instance) => {
          if (instance.items.length === 0) {
            instance.list.closest("section").remove();
            return;
          }
          instance.items.sort((a, b) => {
            const elA = a.element;
            const elB = b.element;
            const dateA = new Date(elA.dataset.sortdate);
            const dateB = new Date(elB.dataset.sortdate);
            if (dateA < dateB)
              return 1;
            if (dateA > dateB)
              return -1;
            return 0;
          });
          instance.renderItems();
        });
      }
    ]);
  };
})();
//# sourceMappingURL=library.js.map
