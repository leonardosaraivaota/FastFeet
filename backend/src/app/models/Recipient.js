import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        street: Sequelize.STRING,
        number: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        zip_code: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    /*
    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });
    */
    return this;
  }
  /*
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }
  */
  /*
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  */
}

export default Recipient;
