import { Injectable } from '@nestjs/common';


@Injectable()
export class ProductService {
  async findAll() {
    const res = await fetch('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
    return res.json();
  }

  async findOne(id: number) {
    const res = await fetch('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider/' + id);
    return res.json();
  }
}
