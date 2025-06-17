import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductService {
  async findAllBrazilan() {
    const res = await fetch('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
    return res.json();
  }

  async findOneBrazilian(id: number) {
    const res = await fetch('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/' + id);
    return res.json();
  }
  async findAllEuropean() {
    const res = await fetch('https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
    return res.json();
  }

  async findOneEuropean(id: number) {
    const res = await fetch('https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider/' + id);
    return res.json();
  }
}
