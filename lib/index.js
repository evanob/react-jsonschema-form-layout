"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ObjectField2 = require("react-jsonschema-form/lib/components/fields/ObjectField");

var _ObjectField3 = _interopRequireDefault(_ObjectField2);

var _utils = require("react-jsonschema-form/lib/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridField = function (_ObjectField) {
  _inherits(GridField, _ObjectField);

  function GridField() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, GridField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = GridField.__proto__ || Object.getPrototypeOf(GridField)).call.apply(_ref, [this].concat(args))), _this), _this.state = { firstName: "hasldf" }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(GridField, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          uiSchema = _props.uiSchema,
          errorSchema = _props.errorSchema,
          idSchema = _props.idSchema,
          required = _props.required,
          disabled = _props.disabled,
          readonly = _props.readonly,
          onBlur = _props.onBlur,
          formData = _props.formData;
      var _props$registry = this.props.registry,
          definitions = _props$registry.definitions,
          fields = _props$registry.fields,
          formContext = _props$registry.formContext;
      var SchemaField = fields.SchemaField,
          TitleField = fields.TitleField,
          DescriptionField = fields.DescriptionField;

      var schema = (0, _utils.retrieveSchema)(this.props.schema, definitions);
      var title = schema.title === undefined ? "" : schema.title;

      var layout = uiSchema["ui:layout"];

      var LayoutWrapper = function LayoutWrapper(_ref2) {
        var children = _ref2.children;
        return _react2.default.createElement(
          "fieldset",
          null,
          children
        );
      };
      var RowElement = function RowElement(_ref3) {
        var children = _ref3.children;
        return _react2.default.createElement(
          "div",
          { className: "row" },
          children
        );
      };
      var ItemElement = function ItemElement(_ref4) {
        var children = _ref4.children,
            itemProps = _ref4.itemProps,
            hide = _ref4.hide;

        var style = {};
        if (hide) style = { display: "none" };
        return _react2.default.createElement(
          "div",
          _extends({}, itemProps, { style: style }),
          children
        );
      };

      var options = formContext.layoutOptions;

      if (options && options.wrapper) LayoutWrapper = options.wrapper;
      if (options && options.rowElement) RowElement = options.rowElement;
      if (options && options.itemElement) ItemElement = options.itemElement;

      return _react2.default.createElement(
        LayoutWrapper,
        null,
        title ? _react2.default.createElement(TitleField, {
          id: idSchema.$id + "__title",
          title: title,
          required: required,
          formContext: formContext
        }) : null,
        schema.description ? _react2.default.createElement(DescriptionField, {
          id: idSchema.$id + "__description",
          description: schema.description,
          formContext: formContext
        }) : null,
        layout.map(function (row, rowIndex) {
          return _react2.default.createElement(
            RowElement,
            { key: rowIndex },
            Object.keys(row).map(function (name, itemIndex) {
              var _row$name = row[name],
                  doShow = _row$name.doShow,
                  itemProps = _objectWithoutProperties(_row$name, ["doShow"]);

              var hide = doShow && !doShow({ formData: formData });
              if (schema.properties[name]) {
                return _react2.default.createElement(
                  ItemElement,
                  { key: [rowIndex, itemIndex], itemProps: itemProps, hide: hide },
                  _react2.default.createElement(SchemaField, {
                    name: name,
                    required: _this2.isRequired(name),
                    schema: schema.properties[name],
                    uiSchema: uiSchema[name],
                    errorSchema: errorSchema[name],
                    idSchema: idSchema[name],
                    formData: formData[name],
                    onChange: _this2.onPropertyChange(name),
                    onBlur: onBlur,
                    registry: _this2.props.registry,
                    disabled: disabled,
                    readonly: readonly
                  })
                );
              } else {
                var _row$name2 = row[name],
                    render = _row$name2.render,
                    _itemProps = _objectWithoutProperties(_row$name2, ["render"]);

                var UIComponent = function UIComponent() {
                  return null;
                };

                if (render) {
                  UIComponent = render;
                }

                return _react2.default.createElement(
                  ItemElement,
                  { key: index, itemProps: _itemProps, hide: hide },
                  _react2.default.createElement(UIComponent, {
                    name: name,
                    formData: formData,
                    errorSchema: errorSchema,
                    uiSchema: uiSchema,
                    schema: schema,
                    registry: _this2.props.registry
                  })
                );
              }
            })
          );
        })
      );
    }
  }]);

  return GridField;
}(_ObjectField3.default);

exports.default = GridField;
module.exports = exports["default"];