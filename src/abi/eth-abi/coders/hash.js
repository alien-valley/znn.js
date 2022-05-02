"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashCoder = void 0;
var abstract_coder_1 = require("./abstract-coder");
var bytes_1 = require("@ethersproject/bytes");
var HashCoder = /** @class */ (function (_super) {
    __extends(HashCoder, _super);
    function HashCoder(localName) {
        var _this = _super.call(this, 'hash', 'hash', localName, false) || this;
        _this.size = 32;
        return _this;
    }
    HashCoder.prototype.defaultValue = function () {
        return '0x0000000000000000000000000000000000000000000000000000000000000000';
    };
    HashCoder.prototype.encode = function (writer, value) {
        var data = (0, bytes_1.arrayify)(value);
        if (data.length !== this.size) {
            this._throwError('incorrect data length', value);
        }
        return writer.writeValue(data);
    };
    HashCoder.prototype.decode = function (reader) {
        return reader.coerce(this.name, (0, bytes_1.hexlify)(reader.readBytes(this.size)));
    };
    return HashCoder;
}(abstract_coder_1.Coder));
exports.HashCoder = HashCoder;
