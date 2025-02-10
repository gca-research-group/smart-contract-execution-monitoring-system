import { Op, QueryInterface } from 'sequelize';
import { UserRoles } from '@app/enums';

import bcrypt from 'bcrypt';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const entities = [];

    const [admin] = await queryInterface.sequelize.query(
      `select * from "Users" u where u.email = 'admin@admin.com'`,
    );

    if (admin.length === 0) {
      entities.push({
        name: 'Admin',
        email: 'admin@admin.com',
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD || '123456', 8),
        isSuper: true,
        role: UserRoles.ADMIN,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    if (entities.length === 0) {
      return;
    }

    return queryInterface.bulkInsert('Users', entities);
  },

  async down(queryInterface: QueryInterface) {
    return queryInterface.bulkDelete('Users', {
      email: { [Op.in]: ['admin@admin.com'] },
    });
  },
};
