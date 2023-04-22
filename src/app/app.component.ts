import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  day!: number;
  month!: number;
  year!: number;
  errorMessage!: string;
  isValid: boolean = true;

  ageYears!: number;
  ageMonths!: number;
  ageDays!: number;

  calculateAge() {
    if (!this.day || !this.month || !this.year) {
      // Si un des champs est vide, on affiche un message d'erreur
      this.errorMessage = 'Veuillez remplir tous les champs.';
      this.isValid = false;
      return;
    }

    const date = new Date(this.year, this.month - 1, this.day);
    console.log(date);
    // On vérifie si la date saisie est valide
    if (!this.isValidDate(this.year, this.month, this.day)) {
      // Si la date n'est pas valide on affiche un message d'erreur
      this.errorMessage = `La date saisie n'est pas valide`;
      this.isValid = false;
      return;
    }
    if (date > new Date()) {
      this.errorMessage = `La date est postérieure à la date d'aujourd'hui.`;
      this.isValid = false;
      return;
    }

    // On calcule l'âge de la personne à partir de la date saisie

    const ageDate = new Date(Date.now() - date.getTime());
    this.ageYears = Math.abs(ageDate.getUTCFullYear() - 1970);
    this.ageMonths = ageDate.getUTCMonth();
    this.ageDays = ageDate.getUTCDate() - 1;

    // On réinitialise le message d'erreur
    this.errorMessage = '';
    this.isValid = true;
  }

  isValidDate(year: number, month: number, day: number): boolean {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }
}
