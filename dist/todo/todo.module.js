"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const todos_entity_1 = require("../database/todos.entity");
const todo_controller_1 = require("./todo.controller");
const consumer_entity_1 = require("../database/consumer.entity");
const auth_module_1 = require("../auth/auth.module");
const todo_service_1 = require("./todo.service");
let TodoModule = class TodoModule {
};
TodoModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([consumer_entity_1.Consumer, todos_entity_1.Todos]), auth_module_1.AuthModule],
        controllers: [todo_controller_1.TodosController],
        providers: [todo_service_1.TodosService],
        exports: [typeorm_1.TypeOrmModule, todo_service_1.TodosService]
    })
], TodoModule);
exports.TodoModule = TodoModule;
//# sourceMappingURL=todo.module.js.map