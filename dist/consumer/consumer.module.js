"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsumerModule = void 0;
const common_1 = require("@nestjs/common");
const consumer_service_1 = require("./consumer.service");
const consumer_controller_1 = require("./consumer.controller");
const typeorm_1 = require("@nestjs/typeorm");
const consumer_entity_1 = require("../database/consumer.entity");
const auth_module_1 = require("../auth/auth.module");
const todos_entity_1 = require("../database/todos.entity");
let ConsumerModule = class ConsumerModule {
};
ConsumerModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consumer_entity_1.Consumer, todos_entity_1.Todos]), auth_module_1.AuthModule],
        controllers: [consumer_controller_1.ConsumerController],
        providers: [consumer_service_1.ConsumerService],
        exports: [typeorm_1.TypeOrmModule, consumer_service_1.ConsumerService]
    })
], ConsumerModule);
exports.ConsumerModule = ConsumerModule;
//# sourceMappingURL=consumer.module.js.map