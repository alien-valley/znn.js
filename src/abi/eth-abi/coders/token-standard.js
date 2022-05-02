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
exports.TokenStandardCoder = void 0;
var abstract_coder_1 = require("./abstract-coder");
var bytes_1 = require("@ethersproject/bytes");
var TokenStandardCoder = /** @class */ (function (_super) {
    __extends(TokenStandardCoder, _super);
    function TokenStandardCoder(localName) {
        var _this = _super.call(this, 'tokenStandard', 'tokenStandard', localName, false) || this;
        _this.size = 10;
        return _this;
    }
    TokenStandardCoder.prototype.defaultValue = function () {
        return '0x00000000000000000000';
    };
    TokenStandardCoder.prototype.encode = function (writer, value) {
        var data = (0, bytes_1.arrayify)(value);
        if (data.length !== this.size) {
            this._throwError('incorrect data length', value);
        }
        return writer.writeValue(data);
    };
    TokenStandardCoder.prototype.decode = function (reader) {
        return (0, bytes_1.hexZeroPad)(reader.readValue().toHexString(), this.size);
    };
    return TokenStandardCoder;
}(abstract_coder_1.Coder));
exports.TokenStandardCoder = TokenStandardCoder;
