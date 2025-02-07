import { Op, QueryInterface } from 'sequelize';

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
        password:
          process.env.ADMIN_PASSWORD ||
          '$2b$08$13dwW0xPoQIUnXCtTXrpk.hsJpW4HoabMeCXeWmzrK7XiIZrlF07e',
        isSuper: true,
        profile: 'admin',
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
      email: { [Op.in]: ['admin@admin.com', 'api@api.com'] },
    });
  },
};
