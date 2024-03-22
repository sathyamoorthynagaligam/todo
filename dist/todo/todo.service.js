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
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const consumer_entity_1 = require("../database/consumer.entity");
const todos_entity_1 = require("../database/todos.entity");
const typeorm_2 = require("typeorm");
let TodosService = class TodosService {
    constructor(consumerRepository, todosRepository) {
        this.consumerRepository = consumerRepository;
        this.todosRepository = todosRepository;
    }
    async getAllTodos(consumerId, status, searchText, sort, limit, pageNumber) {
        if (pageNumber == 0) {
            throw new common_1.BadRequestException('Page number must be greater than zero');
        }
        const skip = (pageNumber - 1) * (limit || 0);
        const todo = await this.todosRepository.find({
            where: { consumer: { id: consumerId },
                status: status,
                title: (0, typeorm_2.Like)(`%${searchText || ''}%`) },
            order: { updatedAt: sort || "ASC" },
            take: limit,
            skip: skip || 0
        });
        return { count: todo.length, todo: todo };
    }
    async createTodos(consumer, data) {
        let todosObj = new todos_entity_1.Todos();
        todosObj.title = consumer.title;
        todosObj.description = consumer.description;
        const startAt = new Date(consumer.startAt);
        if (isNaN(startAt.getTime())) {
            console.log(isNaN(startAt.getTime()));
            throw new common_1.BadRequestException("startAt has an invalid date format");
        }
        const completeBy = new Date(consumer.completeBy);
        if (isNaN(completeBy.getTime())) {
            throw new common_1.BadRequestException("completeBy has an invalid date format");
        }
        if (consumer.startAt == "") {
            throw new common_1.BadRequestException(" empty string cannot be accepted");
        }
        else if (consumer.startAt == null) {
            todosObj.startAt = consumer.startAt;
        }
        else {
            todosObj.startAt = consumer.startAt;
        }
        if (consumer.completeBy == "") {
            throw new common_1.BadRequestException(" empty string cannot be accepted");
        }
        else if (consumer.completeBy == null) {
            todosObj.completeBy = consumer.completeBy;
        }
        else {
            todosObj.completeBy = consumer.completeBy;
        }
        todosObj.consumer = data;
        await this.todosRepository.save(todosObj);
        return todosObj;
    }
    async getTodoId(id, consumerId) {
        let todo = await this.todosRepository.find({
            where: {
                id: id,
                consumer: { id: consumerId }
            },
            relations: ['consumer']
        });
        if (!todo) {
            throw new common_2.ForbiddenException('Consumer is not found');
        }
        else {
            return todo[0];
        }
    }
    async updateTodos(id, consumer, consumerId) {
        const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
        if (!todosObj) {
            throw new common_2.ForbiddenException('Consumer not found');
        }
        todosObj.title = consumer.title;
        todosObj.description = consumer.description;
        await this.todosRepository.save(todosObj);
        const updatedObj = await this.todosRepository.findOneBy({ id });
        return updatedObj;
    }
    async updateTodosStatus(id, consumer, consumerId) {
        const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
        if (!todosObj) {
            throw new common_2.ForbiddenException('Consumer not found');
        }
        if (consumer.status === 'not started' || consumer.status === 'in progress' || consumer.status === 'completed') {
            todosObj.status = consumer.status;
            await this.todosRepository.save(todosObj);
            const updatedObj = await this.todosRepository.findOneBy({ id });
            return updatedObj;
        }
        else {
            throw new common_2.ForbiddenException('Status must be: not started or in progress or completed');
        }
    }
    async deleteTodos(id, consumerId) {
        const todosObj = await this.todosRepository.findOneBy({ id, consumer: { id: consumerId } });
        if (!todosObj) {
            throw new common_2.ForbiddenException('Consumer not found');
        }
        const deletedObj = await this.todosRepository.delete(id);
        return { statusCode: 204 };
    }
};
TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consumer_entity_1.Consumer)),
    __param(1, (0, typeorm_1.InjectRepository)(todos_entity_1.Todos)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TodosService);
exports.TodosService = TodosService;
//# sourceMappingURL=todo.service.js.map