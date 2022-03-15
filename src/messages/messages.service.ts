import { Get, Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { Message } from './Message';
import { MessageDto } from './MessageDTO';

@Injectable()
export class MessagesService {
    private messages: Message[] = [
        {id: 1, text: "Primeira mensagem"},
        {id: 2, text: "Segunda mensagem"},
        {id: 3, text: "Terceira mensagem"}
    ];

    findAll() {
        return this.messages.filter(Boolean);
    }

    async findById(id: number) {
        const message = this.messages.find((msg) => msg?.id === id);

        if(!message) {
            throw Error(`Messagem co o ID ${id} não encontrada`);
        }
        return message;
    }

    create(messageDto: MessageDto ) {
        const id = this.messages.length + 1;
        const message: Message = {
            id,
            ...messageDto
        };
        
        this.messages.push(message);

        return message;
    }

    async update(id: number, messageDto: MessageDto ) {
        const message: Message = {
            id,
            ...messageDto
        };
        const index = this.messages.findIndex((message) => message?.id === id);

        if(index < 0) {
            throw Error(`Messagem co o ID ${id} não encontrada`);
        }

        this.messages[index] = message;

        return message;
    }

    async delete(id: number) {
        const index = this.messages.findIndex((message) => message?.id === id);

        if(index < 0) {
            throw Error(`Messagem co o ID ${id} não encontrada`);
        }

        
        delete this.messages[index];

        return true;
    }
}
