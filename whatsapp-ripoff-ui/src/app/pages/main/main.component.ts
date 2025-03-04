import { Component, OnInit } from "@angular/core";

import { ChatListComponent } from "../../components/chat-list/chat-list.component";
import { ChatResponse, MessageResponse } from "../../services/models";
import { ChatService, MessageService } from "../../services/services";
import { KeycloakService } from "../../utils/keycloak/keycloak.service";

@Component({
  selector: "app-main",
  imports: [ChatListComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {
  chats: Array<ChatResponse> = [];
  selectedChat: ChatResponse = {};
  chatMessages: Array<MessageResponse> = [];

  constructor(
    private chatService: ChatService,
    private keyCloakSerice: KeycloakService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getAllChats();
  }

  private getAllChats() {
    this.chatService.getChatsByReceiver().subscribe({
      next: (res) => {
        this.chats = res;
        console.log("Chats loaded:", this.chats); // Adicione este log
      },
    });
  }

  logout() {
    this.keyCloakSerice.logout();
  }
  userProfile() {
    this.keyCloakSerice.accountManagement();
  }

  chatSelected(chatResponse: ChatResponse) {
    console.log("Chat selected:", chatResponse); // Adicione este log

    this.selectedChat = chatResponse;
    this.getAllChatMessages(chatResponse.id as string);
    this.setMessagesToSeen();
    // this.selectedChat.unreadCount = 0;
  }

  getAllChatMessages(chatId: string) {
    this.messageService
      .getMessages({
        "chat-id": chatId,
      })
      .subscribe({
        next: (messages) => {
          this.chatMessages = messages;
        },
      });
  }

  setMessagesToSeen() {}

  isSelfMessage(message: MessageResponse) {
    return message.senderId === this.keyCloakSerice.userId;
  }
}
