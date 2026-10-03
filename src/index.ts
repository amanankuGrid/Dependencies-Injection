import { createIoCContainer } from './ioc';

import type { Users } from './services/users';
import type { User } from './types';

const renderUsers = async (usersService: Users) => {
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = async () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;

  const ioc = createIoCContainer(config.api);
  const logger = ioc.resolve('logger');
  const usersService = ioc.resolve('users');

  logger.info('Page is loaded.');
  await renderUsers(usersService);
};

window.onload = () => void app();
