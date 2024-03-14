import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceEuro'
})
export class PriceEuroPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR'}).format(value);
  }
}
