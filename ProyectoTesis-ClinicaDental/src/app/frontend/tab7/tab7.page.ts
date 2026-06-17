import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonPopover } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { notifications, sparkles, ellipsisVertical, chatboxEllipsesOutline, timeOutline, happyOutline, arrowForwardCircle, paperPlane, medicalOutline, optionsOutline, waterOutline } from 'ionicons/icons';
import { ProfileService } from '../profile.service';

interface ChatMessage {
  sender: 'user' | 'ia';
  text: string;
  time: string;
}

@Component({
  selector: 'app-tab7',
  templateUrl: 'tab7.page.html',
  styleUrls: ['tab7.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, IonContent, IonGrid, IonRow, IonCol, IonAvatar, IonIcon, IonButton, IonPopover
  ],
})
export class Tab7Page implements OnInit {
  notifActive: boolean = false;
  chatMessage: string = '';
  isTyping: boolean = false;
  showEmojiPicker: boolean = false;
  profileImage: string = '';

  emojiList: string[] = [
    '😀', '😁', '😂', '😃', '😄', '😅', '😆', '😉', '😊', '😋',
    '😎', '😍', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔', '😐',
    '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪',
    '😫', '😴', '😌', '🤓', '😛', '😜', '😝', '🤤', '😒', '😓',
    '😔', '😕', '🙃', '🤑', '😲', '☹️', '🙁', '😖', '😞', '😟',
    '😤', '😢', '😭', '😦', '😧', '😨', '😩', '😬', '😰', '😱',
    '😳', '😵', '😡', '😠', '😷', '🤒', '🤕', '🤢', '🤧', '😇',
    '🤠', '🤡', '🤥', '🤫', '🤭', '🧐', '🧠', '🦷', '👍', '👋'
  ];

  messages: ChatMessage[] = [
    {
      sender: 'ia',
      text: 'Lamento escuchar eso. El dolor persistente puede deberse a varias causas, como una caries profunda o sensibilidad. Te recomiendo evitar bebidas muy frías o calientes, usar hilo dental suavemente y agendar una revisión lo antes posible. ¿Deseas que revise la disponibilidad del Dr. García para hoy?',
      time: '09:16 AM'
    },
    {
      sender: 'user',
      text: 'Sí, por favor. ¿Qué horarios tienen disponibles?',
      time: '09:17 AM'
    }
  ];

  constructor(private router: Router, private profileService: ProfileService) {
    addIcons({
      notifications,
      sparkles,
      ellipsisVertical,
      chatboxEllipsesOutline,
      timeOutline,
      happyOutline,
      arrowForwardCircle,
      paperPlane,
      medicalOutline,
      optionsOutline,
      waterOutline
    });
  }

  ngOnInit() {
    this.profileService.profileImage$.subscribe(img => {
      this.profileImage = img;
    });
  }

  viewProfile() {
    this.router.navigate(['/tabs/tab6']);
  }

  toggleNotification() {
    this.notifActive = !this.notifActive;
  }

  sendMessage() {
    if (!this.chatMessage || !this.chatMessage.trim()) return;

    const userText = this.chatMessage;

    this.messages.push({
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    this.chatMessage = '';
    this.showEmojiPicker = false;
    this.isTyping = true;

    setTimeout(() => {
      this.isTyping = false;

      this.messages.push({
        sender: 'ia',
        text: '¡Entendido! Estoy procesando tu solicitud con nuestro sistema clínico para verificar los espacios disponibles del Dr. García. Dame un momento.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }, 2500);
  }

  selectSuggestion(question: string) {
    this.chatMessage = question;
  }

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(emoji: string) {
    this.chatMessage += emoji;
  }

  closeEmojiPickerOnFocus() {
    this.showEmojiPicker = false;
  }

  openEmojiPicker() {
    console.log('Abriendo selector de emojis...');
  }

  openHistory() { console.log('Abriendo el historial...'); }
  goToProfile() { this.router.navigate(['/tabs/tab6']); }
  createNewChat() { console.log('Iniciando una nueva conversación...'); }
}
