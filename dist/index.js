"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexPaprikaClient = void 0;
// Export client
var client_1 = require("./client");
Object.defineProperty(exports, "DexPaprikaClient", { enumerable: true, get: function () { return client_1.DexPaprikaClient; } });
// Export model interfaces
__exportStar(require("./models/base"), exports);
__exportStar(require("./models/dexes"), exports);
__exportStar(require("./models/networks"), exports);
__exportStar(require("./models/pools"), exports);
__exportStar(require("./models/search"), exports);
__exportStar(require("./models/tokens"), exports);
__exportStar(require("./models/utils"), exports);
