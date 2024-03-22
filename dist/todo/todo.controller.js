"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const todo_service_1 = require("./todo.service");
let TodosController = class TodosController {
    constructor(todosService) {
        this.todosService = todosService;
    }
    async createTodos(payload, req) {
        if (!payload.title || !payload.description) {
            throw new common_1.BadRequestException('Missing Parameters');
        }
        else {
            return this.todosService.createTodos(payload, req.user.id);
        }
    }
    async getAllTodos(req, status, searchText, sort, limit, pageNumber) {
        const consumerId = req.user.id;
        const todos = await this.todosService.getAllTodos(consumerId, status, searchText, sort, limit, pageNumber);
        return todos;
    }
    async getTodoId(id, req) {
        console.log(id);
        const todo = await this.todosService.getTodoId(id, req.user.id);
        if (!todo) {
            throw new common_1.ForbiddenException('Consumer not found');
        }
        else {
            return todo;
        }
    }
    async updateTodos(id, payload, req) {
        console.log(id);
        const updateTodo = await this.todosService.updateTodos(id, payload, req.user.id);
        console.log(updateTodo);
        if (!updateTodo) {
            throw new common_1.ForbiddenException('Forbidden error');
        }
        else {
            return updateTodo;
        }
    }
    async updateTodosStatus(id, payload, req) {
        const updateTodo = await this.todosService.updateTodosStatus(id, payload, req.user.id);
        if (!updateTodo) {
            throw new common_1.ForbiddenException('Forbidden error');
        }
        else {
            return updateTodo;
        }
    }
    async deleteTodos(id, req) {
        const result = await this.todosService.deleteTodos(id, req.user.id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "createTodos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)('status')),
    __param(2, (0, common_1.Query)('searchText')),
    __param(3, (0, common_1.Query)('sort')),
    __param(4, (0, common_1.Query)('limit')),
    __param(5, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getAllTodos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "getTodoId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodos", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "updateTodosStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TodosController.prototype, "deleteTodos", null);
TodosController = __decorate([
    (0, common_1.Controller)('api/todos'),
    __metadata("design:paramtypes", [todo_service_1.TodosService])
], TodosController);
exports.TodosController = TodosController;
//# sourceMappingURL=todo.controller.js.map