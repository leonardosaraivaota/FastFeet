import Sequelize, { Model } from 'sequelize';
// import bcrypt from 'bcryptjs';

class DeliveryProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
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

  static associate(models) {
    this.belongsTo(models.Delivery, {
      foreignKey: 'delivery_id',
      as: 'delivery',
    });
  }
  /*
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
  */
}

export default DeliveryProblem;
