import {
  require_react
} from "./chunk-FQO5W7GE.js";
import {
  __commonJS
} from "./chunk-ZS7NZCD4.js";

// node_modules/remixicon-react/AlertFillIcon.js
var require_AlertFillIcon = __commonJS({
  "node_modules/remixicon-react/AlertFillIcon.js"(exports, module) {
    var React = require_react();
    function _interopDefaultLegacy(e) {
      return e && typeof e === "object" && "default" in e ? e : { "default": e };
    }
    var React__default = _interopDefaultLegacy(React);
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var objectWithoutProperties = function(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0)
          continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i))
          continue;
        target[i] = obj[i];
      }
      return target;
    };
    var AlertFillIcon = function AlertFillIcon2(_ref) {
      var _ref$color = _ref.color, color = _ref$color === void 0 ? "currentColor" : _ref$color, _ref$size = _ref.size, size = _ref$size === void 0 ? 24 : _ref$size, children = _ref.children, props = objectWithoutProperties(_ref, ["color", "size", "children"]);
      var className = "remixicon-icon " + (props.className || "");
      return React__default["default"].createElement(
        "svg",
        _extends({}, props, { className, width: size, height: size, fill: color, viewBox: "0 0 24 24" }),
        React__default["default"].createElement("path", { d: "M12.866 3l9.526 16.5a1 1 0 0 1-.866 1.5H2.474a1 1 0 0 1-.866-1.5L11.134 3a1 1 0 0 1 1.732 0zM11 16v2h2v-2h-2zm0-7v5h2V9h-2z" })
      );
    };
    var AlertFillIcon$1 = React__default["default"].memo ? React__default["default"].memo(AlertFillIcon) : AlertFillIcon;
    module.exports = AlertFillIcon$1;
  }
});
export default require_AlertFillIcon();
//# sourceMappingURL=remixicon-react_AlertFillIcon.js.map
