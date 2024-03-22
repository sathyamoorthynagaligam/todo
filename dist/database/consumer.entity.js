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
exports.Consumer = void 0;
const typeorm_1 = require("typeorm");
const todos_entity_1 = require("./todos.entity");
let Consumer = class Consumer {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", Number)
], Consumer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'firstname' }),
    __metadata("design:type", String)
], Consumer.prototype, "firstname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'lastname' }),
    __metadata("design:type", String)
], Consumer.prototype, "lastname", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email' }),
    (0, typeorm_1.Unique)(['email']),
    __metadata("design:type", String)
], Consumer.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password' }),
    __metadata("design:type", String)
], Consumer.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => todos_entity_1.Todos, (todos) => todos.consumer),
    (0, typeorm_1.JoinColumn)({ name: 'consumer_id' }),
    __metadata("design:type", Array)
], Consumer.prototype, "todos", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Consumer.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Consumer.prototype, "updatedAt", void 0);
Consumer = __decorate([
    (0, typeorm_1.Entity)("consumer")
], Consumer);
exports.Consumer = Consumer;
//# sourceMappingURL=consumer.entity.js.map