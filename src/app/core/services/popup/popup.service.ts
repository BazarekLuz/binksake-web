import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";
import {LanguageService} from "../language/language.service";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(
    private messageService: MessageService,
    private languageService: LanguageService,

  ) { }

  createErrorMessage(message: string) {
    this.messageService.add({
      severity: 'error',
      life: 1000 * 7,
      summary: this.languageService.instant('error.summary'),
      detail: message,
    })
  }

  createSuccessMessage() {
    this.messageService.add({
      severity: "success",
      life: 1000 * 7,
      summary: this.languageService.instant('success.summary'),
    })
  }
}
