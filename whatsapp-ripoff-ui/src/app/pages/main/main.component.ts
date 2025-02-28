import { Component, OnInit } from "@angular/core";

import { ChatListComponent } from "../../components/chat-list/chat-list.component";
import { ChatResponse } from "../../services/models";
import { ChatService } from "../../services/services";
import { KeycloakService } from "../../utils/keycloak/keycloak.service";

@Component({
  selector: "app-main",
  imports: [ChatListComponent],
  templateUrl: "./main.component.html",
  styleUrl: "./main.component.scss",
})
export class MainComponent implements OnInit {
  chats: Array<ChatResponse> = [];

  constructor(
    private chatService: ChatService,
    private keyCloakSerice: KeycloakService
  ) {}

  ngOnInit(): void {
    this.getAllChats();
  }

  private getAllChats() {
    this.chatService.getChatsByReceiver().subscribe({
      next: (res) => {
        this.chats = res;
      },
    });
  }

  logout() {
    this.keyCloakSerice.logout();
  }
  userProfile() {
    this.keyCloakSerice.accountManagement();
  }
}
