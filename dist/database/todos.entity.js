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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todos = void 0;
const typeorm_1 = require("typeorm");
const consumer_entity_1 = require("./consumer.entity");
let Todos = class Todos {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", Number)
], Todos.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'title' }),
    __metadata("design:type", String)
], Todos.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'description' }),
    __metadata("design:type", String)
], Todos.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_at', nullable: true }),
    __metadata("design:type", Date)
], Todos.prototype, "startAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'complete_by', nullable: true }),
    __metadata("design:type", Date)
], Todos.prototype, "completeBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => consumer_entity_1.Consumer, (consumer) => consumer.todos, { lazy: false }),
    (0, typeorm_1.JoinColumn)({ name: 'consumer_id' }),
    __metadata("design:type", consumer_entity_1.Consumer)
], Todos.prototype, "consumer", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', default: 'not started' }),
    __metadata("design:type", String)
], Todos.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Todos.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Todos.prototype, "updatedAt", void 0);
Todos = __decorate([
    (0, typeorm_1.Entity)("todos")
], Todos);
exports.Todos = Todos;
//# sourceMappingURL=todos.entity.js.map