import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  // Define a mapping of currency codes to symbols
  private currencySymbols: { [key: string]: string } = {
    USD: '$',
    EUR: '€',
    INR: '₹',
    // Add more currencies as needed
  };

  // Function to get the currency symbol based on the currency code
  getCurrencySymbol(currencyCode: string): string {
    // Use the mapping to get the symbol, default to an empty string if not found
    return this.currencySymbols[currencyCode] || '';
  }
}
