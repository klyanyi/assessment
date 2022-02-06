import { createServer } from 'miragejs';
import data from './data.json';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/posts', () => {
      return data;
    });

    this.get('/posts/:id', (schema, request) => {
      const post = data.posts.filter((d) => d.id === request.params.id)[0];
      return post;
    });
  },
});
