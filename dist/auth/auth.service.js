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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const consumer_entity_1 = require("../database/consumer.entity");
const todos_entity_1 = require("../database/todos.entity");
let AuthService = class AuthService {
    constructor(consumerRepository, todosRepository, jwtService) {
        this.consumerRepository = consumerRepository;
        this.todosRepository = todosRepository;
        this.jwtService = jwtService;
    }
    async findOne(email) {
        return this.consumerRepository.findOne({ where: { email: email } });
    }
    async validateUser(email, pass) {
        const user = await this.consumerRepository.findOne({ where: { email: email } });
        if (user) {
            const match = await bcrypt.compare(pass, user.password);
            if (match) {
                const { password } = user, result = __rest(user, ["password"]);
                return result;
            }
            else {
                return null;
            }
        }
        return null;
    }
    async logIn(consumer) {
        const data = await this.findOne(consumer.email);
        const payload = {
            sub: data.id,
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async signUp(consumer) {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(consumer.password, saltRounds);
        let userObj = new consumer_entity_1.Consumer();
        userObj.firstname = consumer.firstName;
        userObj.lastname = consumer.lastName;
        userObj.email = consumer.email;
        userObj.password = passwordHash;
        await this.consumerRepository.save(userObj);
        const { password } = userObj, result = __rest(userObj, ["password"]);
        return result;
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(consumer_entity_1.Consumer)),
    __param(1, (0, typeorm_1.InjectRepository)(todos_entity_1.Todos)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map