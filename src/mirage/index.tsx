import { createServer, Model, Response } from 'miragejs';
import { Product } from '../interfaces/Product.interface';
import { Favorites, User } from '../interfaces/User.interface';
import televisionsData from '../store/television.store.json';
import gamesData from '../store/games.store.json';
import usersData from '../store/users.store.json';
import { paginationHelper } from '../utils/pagination';


export function makeServer() {
    const server = createServer({
        models: {
            user: Model.extend<Partial<User>>({}),
            televisions: Model,
        },
        routes() {
            this.namespace = 'api';
            this.get('/televisions', function (this: any, schema, request) {
                const { page = 1, per_page = 3 } = request.queryParams;

                const total = televisionsData.length
                const televisions = paginationHelper(televisionsData, Number(page), Number(per_page))

                return new Response(
                    200,
                    { 'x-total-count': String(total) },
                    televisions
                )
            });

            this.post('/users', function (this: any, shema, request) {

                const { email, password } = JSON.parse(request.requestBody);

                const user = usersData.find(user => user.email === email && user.password === password);

                if (!user) {
                    throw new Error("Email or password is invalid");
                }
                const favorites = user.favorites;
                return new Response(
                    200,
                    {},
                    { user, favorites }
                )
            });
        }
    })
    return server;
}
