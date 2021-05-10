import { createServer, Model, Response } from 'miragejs';
import { Product } from '../interfaces/Product.interface';
import { User } from '../interfaces/User.interface';
import televisionsData from '../store/television.store.json';
import gamesData from '../store/games.store.json';
import usersData from '../store/users.store.json';
import { paginationHelper } from '../utils/pagination';
import { filterData } from '../utils/filter';
import { orderData } from '../utils/order';

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
      televisions: Model,
    },
    routes() {
      this.namespace = 'api';
      this.get('/games', function (this: any, schema, request) {
        let {
          page = 1,
          per_page = 3,
          queryFilter,
          orderBy,
        } = request.queryParams;
        let products: Product[] = gamesData['data'];
        const filters = gamesData['filters'];
        const total = products.length;
        if (queryFilter) {
          page = 1;
          products = filterData(products, queryFilter);
        }

        if (orderBy) {
          products = orderData(products, orderBy);
        }

        const response = paginationHelper(
          products,
          Number(page),
          Number(per_page)
        );

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { products: response, filters }
        );
      });

      this.get('/televisions', function (this: any, schema, request) {
        let {
          page = 1,
          per_page = 3,
          queryFilter,
          orderBy,
        } = request.queryParams;
        let products: Product[] = televisionsData['data'];
        const filters = televisionsData['filters'];
        const total = products.length;
        if (queryFilter) {
          page = 1;
          products = filterData(products, queryFilter);
        }

        if (orderBy) {
          products = orderData(products, orderBy);
        }

        const response = paginationHelper(
          products,
          Number(page),
          Number(per_page)
        );

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { products: response, filters }
        );
      });

      this.post('/users', function (this: any, shema, request) {
        const { email, password } = JSON.parse(request.requestBody);

        const user = usersData.find(
          (user) => user.email === email && user.password === password
        );

        if (!user) {
          throw new Error('Email or password is invalid');
        }
        const favorites = user.favorites;
        return new Response(200, {}, { user, favorites });
      });
    },
  });

  return server;
}
