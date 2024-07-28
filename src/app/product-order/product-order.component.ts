import { Component } from '@angular/core';

interface Order {
  product: string;
  quantity: number;
}

@Component({
  selector: 'app-product-order',
  templateUrl: './product-order.component.html',
  styleUrls: ['./product-order.component.css'],
})
export class ProductOrderComponent {
  products: string[] = ['Pencil', 'Eraser', 'Pens'];
  orderList: Order[] = [{ product: '', quantity: null }];
  maxRows = 8;
  showOrderButton = false;

  addRow() {
    if (
      this.orderList.length < this.maxRows &&
      this.isRowValid(this.orderList[this.orderList.length - 1])
    ) {
      this.orderList.push({ product: '', quantity: null });
    }
  }

  showOrder() {
    this.orderList = this.orderList.filter(
      (order) => order.product && order.quantity !== null
    );
    this.showOrderButton = true;
  }

  get isOrderValid(): boolean {
    return this.orderList.every(
      (order) => order.product && order.quantity !== null
    );
  }

  isRowValid(order: Order): boolean {
    return !!order.product && order.quantity !== null;
  }

  readOrder() {
    const orderText = this.orderList
      .map((order) => `${order.product} with quantity ${order.quantity}`)
      .join(', ');
    this.textToSpeech(orderText);
  }

  textToSpeech(text: string) {
    const apiUrl = 'https://api.voicerss.org/';
    const apiKey = '6a60465ed7864855ac032d91fc0ac7be';
    const url = `${apiUrl}?key=${apiKey}&src=${encodeURIComponent(
      text
    )}&hl=en-us`;

    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const audioUrl = URL.createObjectURL(blob);
        const audio = new Audio(audioUrl);
        audio.play();
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }
}
