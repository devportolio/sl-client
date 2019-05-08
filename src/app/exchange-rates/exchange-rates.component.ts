import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Component({
  selector: 'app-exchange-rates',
  template: `
    <div *ngIf="loading">
      Loading...
    </div>
    <div *ngIf="error">
      Error :(
    </div>
    <div *ngIf="rates">
      <div *ngFor="let rate of rates">
        <p>{{rate.currency}}: {{rate.rate}}</p>
      </div>
    </div>
  `,
})

export class ExchangeRatesComponent implements OnInit {
  rates: any[];
  loading = true;
  errors: any;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .watchQuery<any>({
        query: gql`
          {
            rates(currency: "USD") {
              currency
              rate
            }
          }
        `,
      })
      .valueChanges
      .subscribe(({ data, loading, errors }) => {
        this.rates = data.rates;
        this.loading = loading;
        this.errors = errors;

      });
  }
}
