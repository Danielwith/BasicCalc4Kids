import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'BasicCalc4Kids';
  first_value: string = '';
  second_value: string = '';
  operation: string = '';
  result: string = '';
  verif_first: string = '';

  insertChar(number: string): void {
    if (this.first_value.length == 0 && number == '0') {
      return;
    }
    if (
      this.second_value.length == 0 &&
      number == '0' &&
      this.verif_first == 'Ok'
    ) {
      return;
    }

    if (this.operation != '') {
      this.second_value += number;
    } else {
      this.first_value += number;
    }

    this.result = '';
  }

  deleteChar(): void {
    if (this.operation != '') {
      this.second_value = this.second_value.slice(0, -1);
    } else {
      this.first_value = this.first_value.slice(0, -1);
    }
    this.result = '';
  }

  sign(value_sign: string): void {
    if (this.first_rule() == 'Ok') {
      this.operation = value_sign;
      this.result = '';
      this.verif_first = 'Ok';
    } else {
      alert(this.first_rule());
    }
  }

  calculate(): void {
    if (this.second_rule() == 'Ok') {
      if (this.operation == '+') {
        this.result = (
          Number(this.first_value) + Number(this.second_value)
        ).toString();
      } else {
        this.result = (
          Number(this.first_value) - Number(this.second_value)
        ).toString();
      }
      this.clean();
      this.verif_first = '';
    } else {
      if (this.verif_first == 'Ok') {
        alert(this.second_rule());
      } else {
        return;
      }
    }
  }

  clean(): void {
    this.operation = '';
    this.first_value = '';
    this.second_value = '';
  }

  first_rule(): string {
    if (Number(this.first_value) >= 400 && Number(this.first_value) < 1000) {
      return 'Ok';
    } else {
      if (Number(this.first_value.charAt(0)) < 4) {
        return 'Error, el primer dígito debe ser mayor a 3';
      } else if (this.first_value.length < 3 || this.first_value.length > 3) {
        return 'Error, el primer número es de 3 dígitos';
      } else {
        return 'Error.';
      }
    }
  }

  second_rule(): string {
    if (Number(this.second_value) >= 10 && Number(this.second_value) < 100) {
      return 'Ok';
    } else {
      return 'Error, el segundo número es de 2 dígitos';
    }
  }
}
