import { DatePipe } from "@angular/common";
import { Component, input, InputSignal, output } from "@angular/core";

import { ChatResponse, UserResponse } from "../../services/models";
import { ChatService, UserService } from "../../services/services";
import { KeycloakService } from "../../utils/keycloak/keycloak.service";

@Component({
  selector: "app-chat-list",
  imports: [DatePipe],
  templateUrl: "./chat-list.component.html",
  styleUrl: "./chat-list.component.scss",
})
export class ChatListComponent {
  chats: InputSignal<ChatResponse[]> = input<ChatResponse[]>([]);
  searchNewContact = false;
  contacts: Array<UserResponse> = [];
  chatSelected = output<ChatResponse>();

  constructor(
    private userService: UserService,
    private chatService: ChatService,
    private keycloakService: KeycloakService
  ) {}

  searchContact() {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.contacts = users;
        this.searchNewContact = true;
      },
    });
  }

  chatClicked(chat: ChatResponse) {
    console.log("Chat clicked:", chat); // Adicione este log
    this.chatSelected.emit(chat);
  }

  wrapMessage(lastMessage: string | undefined): string {
    if (lastMessage && lastMessage.length <= 20) return lastMessage;

    return lastMessage?.substring(0, 17) + "...";
  }

  selectContact(contact: UserResponse) {
    this.chatService
      .createChat({
        "sender-id": this.keycloakService.userId as string,
        "receiver-id": contact.id as string,
      })
      .subscribe({
        next: (res) => {
          const chat: ChatResponse = {
            id: res.response,
            name: contact.firstName + " " + contact.lastName,
            recipientOnline: contact.online,
            lastMessageTime: contact.lastSeen,
            senderId: this.keycloakService.userId,
            receiverId: contact.id,
          };

          this.chats().unshift(chat);
          (this.searchNewContact = false), this.chatSelected.emit(chat);
        },
      });
  }
}
