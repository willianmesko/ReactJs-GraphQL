import { createServer, Model, Response } from 'miragejs';
import { Product } from '../interfaces/Product.interface';
import televisionsData from '../store/television.store.json';
import gamesData from '../store/games.store.json';
import usersData from '../store/users.store.json';
import { paginationHelper } from '../utils/pagination';
import { filterData } from '../utils/filter';
import { orderData } from '../utils/order';
import { v4 as uuidv4 } from 'uuid';
import { Filter } from '../interfaces/Filters.interface';

export function makeServer() {
  const server = createServer({
    models: {
      user: Model,
      televisions: Model,
    },
    routes() {
      this.namespace = 'api';

      this.get('/products/:departament', function (_, request) {
        const departament = request.params.departament;

        let {
          page = 1,
          per_page = 3,
          queryFilter,
          orderBy,
        } = request.queryParams;
        let products: Product[] = [];
        let filters: Filter[] = [];

        switch (departament) {
          case 'televisions':
            products = televisionsData['data'];
            filters = televisionsData['filters'];
            break;
          case 'games':
            products = gamesData['data'];
            filters = gamesData['filters'];
            break;
        }

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
          Number(per_page),
        );

        return new Response(
          200,
          { 'x-total-count': String(total) },
          { products: response, filters },
        );
      });

      this.post('/user', function (_, request) {
        const { name, email, password } = JSON.parse(request.requestBody);
        let user;

        user = usersData.find(user => user.email === email);

        if (user) {
          throw new Error('Account Already exists');
        }

        user = {
          uuid: uuidv4(),
          name,
          email,
          password,
        };

        usersData.push(user);

        return new Response(200, {}, { user });
      });

      this.post('/session', function (this: any, shema, request) {
        const { email, password } = JSON.parse(request.requestBody);

        const user = usersData.find(
          user => user.email === email && user.password === password,
        );

        if (!user) {
          throw new Error('Email or password is invalid');
        }

        return new Response(200, {}, user);
      });
    },
  });

  return server;
}
