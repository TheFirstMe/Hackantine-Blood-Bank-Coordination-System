const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("/workspace/Hackantine-Blood-Bank-Coordination-System/.cache/dev-404-page.js"))),
  "component---src-pages-admin-js": hot(preferDefault(require("/workspace/Hackantine-Blood-Bank-Coordination-System/src/pages/admin.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/workspace/Hackantine-Blood-Bank-Coordination-System/src/pages/index.js")))
}

